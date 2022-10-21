import "./app-filter.scss";

const AppFilter = (props) => {
  const buttonsData = [
    { name: "all", label: "Все сотрудники", colored: false },
    { name: "promotion", label: " На повышение", colored: false },
    { name: "moreThen1000", label: "З/П более 1000$", colored: true },
  ];

  const { filter, onFilterSelect } = props;

  const btns = buttonsData.map(({ label, name, colored }) => {
    const active = filter === name;
    const clazz = active ? "btn-light" : "btn-outline-light";

    return (
      <button
        onClick={() => onFilterSelect(name)}
        key={name}
        className={`btn ${clazz}`}
        type="button"
      >
        {label}
      </button>
    );
  });

  return <div className="btn-group">{btns}</div>;
};
export default AppFilter;
