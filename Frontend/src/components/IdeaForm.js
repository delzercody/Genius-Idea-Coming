import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import NavBar from "./NavBar";

function IdeaForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const currState = location.state;
  console.log(currState)
  console.log(currState.currCategory.id)
  console.log(currState.currUser.id)

  const formSchema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    category_id: yup.number().required("Category is required"),
    user_id: yup.number()
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category_id: currState.currCategory.id,
      user_id: currState.currUser.id
    },
    validationSchema: formSchema,
    onSubmit: (values, actions) => {
      fetch('http://127.0.0.1:5000/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          actions.resetForm();
          console.log(data)
          navigate('/category', {state: currState});
        })
        .catch(error => alert(error))
    }
  })

  return (
    <>
      <NavBar />
      <h2>Create an idea</h2>
      <section>
        <form className="form" onSubmit={formik.handleSubmit}>
          <label>title:</label>
          <input value={formik.values.title} onChange={formik.handleChange} type='text' name='title' />
          <label>idea:</label>
          <input value={formik.values.description} onChange={formik.handleChange} type='text' name='description' />
          <input type='submit' value='Create' className='button' />
        </form>
        
      </section>
    </>
  );
}

export default IdeaForm;
