import styles from "./SearchBar.module.scss";

export default function SearchBar({ setSearch, isFiltering }) {
  function handleInput(e) {
    const keyboardInput = e.target.value;
    console.log(keyboardInput);
    if (keyboardInput) {
      isFiltering(true);
    } else {
      isFiltering(false);
    }
    setSearch(keyboardInput.trim().toLowerCase());
  }

  return (
    <div
      className={`d-flex flex-row justify-content-center align-item-center my30 ${styles.searchBar}`}
    >
      <i className="fas fa-magnifying-glass mr10"></i>
      <input
        onInput={handleInput}
        className="flex-fill"
        type="text"
        placeholder="Rechercher"
      />
    </div>
  );
}
