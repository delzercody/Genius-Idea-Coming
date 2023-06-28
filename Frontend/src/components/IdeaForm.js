import React from "react";
import { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import NavBar from "./NavBar";

const initialValues = {
  title: "",
  description: "",
  category: ""
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required")
});

const categories = [
  { label: "Cooking", value: "Cooking" },
  { label: "Technology", value: "Technology" },
  { label: "Business", value: "Business" }
];

function IdeaForm() {

  return (
    <div>
      <NavBar />
      <h2>Create an idea</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        // onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <Field
              type="text"
              id="title"
              name="title"
              className="form-control input-sm" // Added input-sm class
            />
            <ErrorMessage name="title" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <Field
              as="textarea"
              id="description"
              name="description"
              className="form-control input-sm" // Added input-sm class
            />
            <ErrorMessage
              name="description"
              component="div"
              className="error"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <Field
              as="select"
              id="category"
              name="category"
              className="form-control input-sm" // Added input-sm class
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="category"
              component="div"
              className="error"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default IdeaForm;
