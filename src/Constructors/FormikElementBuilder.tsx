import { ErrorMessage, Field } from "formik";
import { colors } from "../Constants/Patterns";
import { MYFormikValues } from "../Types/@StructureTypes";

const FormikElementBuilder = (initalValues: MYFormikValues) => {
  let divClassName = colors.FormikDiv;
  const fieldClassName = colors.ForkikField;
  const textboxParams = colors.TextBox;
  if (initalValues.Title) {
    divClassName = colors.FormikDivTight;
  }

  return (
    <>
      <div
        className={`${divClassName} ${
          initalValues.width ? initalValues.width : "w-1/2"
        }`}
      >
        {initalValues.Title && (
          <label htmlFor={initalValues.element}>{initalValues.Title}</label>
        )}
        <Field
          className={`${fieldClassName} ${initalValues.tailwind} ${
            initalValues.textbox && textboxParams
          } ${initalValues.classes}`}
          id={initalValues.element}
          name={initalValues.element}
          type={initalValues.type}
          placeholder={initalValues.placeholder}
          required={initalValues.required}
          hidden={initalValues.hidden}
          style={initalValues.style}
          value={initalValues.value}
          as={initalValues.as}
          {...(initalValues.initalValues
            ? { initalValues: initalValues.initalValues }
            : {})}
          {...(initalValues.onChange
            ? { onChange: initalValues.onChange }
            : {})}
        />
        <ErrorMessage
          name={initalValues.element}
          component="div"
          className="text-red-500"
        />
      </div>
    </>
  );
};

export { FormikElementBuilder };
