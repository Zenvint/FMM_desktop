
const Form = () => {
  return (
    <div class="container">
      <h1>Create Academic Year</h1>
      <form>
        <p>
        <label for="name">NAME:</label>
        <input type="text" id="name" name="name" />
        </p>
        <br></br>
        <div class="grid-container">  
        <div className="box">
            <legend>SCHOOL:</legend>
            <label>
              <input type="text"  name="school" value="Nursery" readOnly /> 
            </label>
            <label>
              <input type="text"  name="school" value="Primary" readOnly /> 
            </label>
            <label>
              <input type="text" name="school" value="Secondary" readOnly />
            </label>
          </div>
          <div>
            <legend>SECTION:</legend>
            <label>
              <input type="text"  name="section" value="English" readOnly /> 
            </label>
            <label>
              <input type="text"  name="section" value="French" readOnly /> 
            </label>
          </div>
          <div>
            <legend>CLASS:</legend>
            <label>
              <input type="text"  name="class" value="Standard" readOnly /> 
            </label>
            <label>
              <input type="text" name="class" value="Custom" readOnly /> 
            </label>
          </div>
          <div>
            <legend>SUBJECTS:</legend>
            <label>
              <input type="text" name="subjects" value="Standard" readOnly />
            </label>
            <label>
              <input type="text" name="subjects" value="Custom" readOnly /> 
            </label>
          </div>
          <div>
          <br></br>
            <legend>ACADEMIC YEAR SCHEDULE:</legend>
            <label for="start_date">
              Starting date:{" "}
              <input type="date" id="start_date" name="start_date" />
            </label>
            <label for="end_date">
              Ending date : <input type="date" id="end_date" name="end_date" />
            </label>
          </div>
        </div>
        <input type="submit" value="Create"></input>
      </form>
    </div>
  );
};


export default Form;