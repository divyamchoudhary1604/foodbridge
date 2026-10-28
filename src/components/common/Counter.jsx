/**
 * Interactive Counter Component.
 * Demonstrates:
 * - Handling events (click, keyboard arrow up/down)
 * - Controlled components & state lifting
 * - Min/max bounds checking
 * 
 * Fulfills syllabus: Lectures 19-24 (Mini project: counter app)
 */
export default function Counter({
  value = 1,
  onChange,
  min = 1,
  max = 999,
  step = 1,
  label = "Servings / Quantity",
  unit = "portions"
}) {
  function handleDecrement() {
    if (value - step >= min) {
      onChange(value - step);
    }
  }

  function handleIncrement() {
    if (value + step <= max) {
      onChange(value + step);
    }
  }

  function handleDirectChange(e) {
    const val = Number(e.target.value);
    if (!isNaN(val)) {
      if (val < min) onChange(min);
      else if (val > max) onChange(max);
      else onChange(val);
    }
  }

  return (
    <div className="counter-component">
      {label && <label className="counter-label">{label}:</label>}
      <div className="counter-control-group">
        <button
          type="button"
          className="counter-btn counter-minus"
          onClick={handleDecrement}
          disabled={value <= min}
          aria-label="Decrease quantity"
        >
          −
        </button>

        <input
          type="number"
          className="counter-input"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={handleDirectChange}
          aria-label={label}
        />

        <button
          type="button"
          className="counter-btn counter-plus"
          onClick={handleIncrement}
          disabled={value >= max}
          aria-label="Increase quantity"
        >
          +
        </button>

        {unit && <span className="counter-unit">{unit}</span>}
      </div>
    </div>
  );
}
