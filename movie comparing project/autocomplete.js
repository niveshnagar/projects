const createAutoComplete = ({
  onOptionSelect,
  inputValue,
  fetchData,
  root,
  renderOption
}) => {
  root.innerHTML = `
  <label><b>Search for a movie</b></label>
    <input class="input"/>
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
`;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const wrapper = root.querySelector(".results");

  const onInput = async (event) => {
    // on input make an api call and wait for the response
    const items = await fetchData(event.target.value);
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }
    wrapper.innerHTML = "";
    dropdown.classList.add("is-active");

    for (let item of items) {
      // create dropdown options and add class is-active to make it visible;
      const option = document.createElement("a");
      option.classList.add("dropdown-item");

      // put image and title inside each option
      option.innerHTML = renderOption(item);

      // add event listner that options up a detailed movie info when clicked;
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");

        input.value = inputValue(item);
        onOptionSelect(item);
      });

      // now our option block is built and is attached with event listeners so one last thing
      // is to render that option block on screen by appending it
      wrapper.appendChild(option);
    }
  };

  input.addEventListener("input", debounce(onInput, 1000));

  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
