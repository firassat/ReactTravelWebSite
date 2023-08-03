import React from "react";

function InputDaysTrip(props) {
  if (props.days_number === 1)
    return (
      <div className="inputDays">
        <form onSubmit={props.onSubmitDays}>
          <label>Day 1</label>
          <input type="text" name="title_1" placeholder="title_1" />
          <input type="text" name="details_1" placeholder="details_1" />
          <input type="submit" value={"Add"} />
        </form>
      </div>
    );
  else if (props.days_number === 2)
    return (
      <div className="inputDays">
        <form onSubmit={props.onSubmitDays}>
          <label>Day 1</label>
          <input type="text" name="title_1" placeholder="title_1" />
          <input type="text" name="details_1" placeholder="details_1" />
          <label>Day 2</label>
          <input type="text" name="title_2" placeholder="title_2" />
          <input type="text" name="details_2" placeholder="details_2" />
          <input type="submit" value={"Add"} />
        </form>
      </div>
    );
  else if (props.days_number === 3)
    return (
      <div className="inputDays">
        <form onSubmit={props.onSubmitDays}>
          <label>Day 1</label>
          <input type="text" name="title_1" placeholder="title_1" />
          <input type="text" name="details_1" placeholder="details_1" />
          <label>Day 2</label>
          <input type="text" name="title_2" placeholder="title_2" />
          <input type="text" name="details_2" placeholder="details_2" />
          <label>Day 3</label>
          <input type="text" name="title_3" placeholder="title_3" />
          <input type="text" name="details_3" placeholder="details_3" />
          <input type="submit" value={"Add"} />
        </form>
      </div>
    );
  else if (props.days_number === 4)
    return (
      <div className="inputDays">
        <form onSubmit={props.onSubmitDays}>
          <label>Day 1</label>
          <input type="text" name="title_1" placeholder="title_1" />
          <input type="text" name="details_1" placeholder="details_1" />
          <label>Day 2</label>
          <input type="text" name="title_2" placeholder="title_2" />
          <input type="text" name="details_2" placeholder="details_2" />
          <label>Day 3</label>
          <input type="text" name="title_3" placeholder="title_3" />
          <input type="text" name="details_3" placeholder="details_3" />
          <label>Day 4</label>
          <input type="text" name="title_4" placeholder="title_4" />
          <input type="text" name="details_4" placeholder="details_4" />
          <input type="submit" value={"Add"} />
        </form>
      </div>
    );
  else if (props.days_number === 5)
    return (
      <div className="inputDays">
        <form onSubmit={props.onSubmitDays}>
          <label>Day 1</label>
          <input type="text" name="title_1" placeholder="title_1" />
          <input type="text" name="details_1" placeholder="details_1" />
          <label>Day 2</label>
          <input type="text" name="title_2" placeholder="title_2" />
          <input type="text" name="details_2" placeholder="details_2" />
          <label>Day 3</label>
          <input type="text" name="title_3" placeholder="title_3" />
          <input type="text" name="details_3" placeholder="details_3" />
          <label>Day 4</label>
          <input type="text" name="title_4" placeholder="title_4" />
          <input type="text" name="details_4" placeholder="details_4" />
          <label>Day 5</label>
          <input type="text" name="title_5" placeholder="title_5" />
          <input type="text" name="details_5" placeholder="details_5" />
          <input type="submit" value={"Add"} />
        </form>
      </div>
    );
  else if (props.days_number === 6)
    return (
      <div className="inputDays">
        <form onSubmit={props.onSubmitDays}>
          <label>Day 1</label>
          <input type="text" name="title_1" placeholder="title_1" />
          <input type="text" name="details_1" placeholder="details_1" />
          <label>Day 2</label>
          <input type="text" name="title_2" placeholder="title_2" />
          <input type="text" name="details_2" placeholder="details_2" />
          <label>Day 3</label>
          <input type="text" name="title_3" placeholder="title_3" />
          <input type="text" name="details_3" placeholder="details_3" />
          <label>Day 4</label>
          <input type="text" name="title_4" placeholder="title_4" />
          <input type="text" name="details_4" placeholder="details_4" />
          <label>Day 5</label>
          <input type="text" name="title_5" placeholder="title_5" />
          <input type="text" name="details_5" placeholder="details_5" />
          <label>Day 6</label>
          <input type="text" name="title_6" placeholder="title_6" />
          <input type="text" name="details_6" placeholder="details_6" />

          <input type="submit" value={"Add"} />
        </form>
      </div>
    );
}

export default InputDaysTrip;
