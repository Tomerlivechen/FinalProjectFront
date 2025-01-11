import * as Yup from "yup";
import { INewSocialGroup } from "../../Models/SocialGroup";
import { Form, Formik } from "formik";
import { FormikElementBuilder } from "../../Constructors/FormikElementBuilder";
import { useState } from "react";
import { colors } from "../../Constants/Patterns";
import ElementFrame from "../../Constructors/ElementFrame";
import { BsPatchPlusFill } from "react-icons/bs";
import { Tooltip } from "react-bootstrap";
import { Groups } from "../../Services/group-service";
import { descriptionlValues, nameValues } from "../../Models/FormikModels";

const GroupCreation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const groupValues: INewSocialGroup = {
    name: "",
    description: "",
  };
  const validationScheme = Yup.object({
    name: Yup.string().min(2).required("The group name is required"),
    description: Yup.string()
      .min(2)
      .required("The group description is required"),
  });

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const createGroup = async (submitValues: INewSocialGroup) => {
    setIsLoading(true);
    await Groups.CreateGroup(submitValues);
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <>
      <div>
        <button
          onClick={toggleOpen}
          className="ml-6 flex items-center p-2 border rounded"
        >
          <Tooltip title="Create Group">
            <div className="flex items-center">
              <span className="mr-2">Create new Group</span>
              <BsPatchPlusFill size={30} />
            </div>
          </Tooltip>
        </button>

        {open && (
          <div className="mt-4">
            <ElementFrame padding={"3"} tailwind="w-[320px] md:w-[200px]">
              <Formik
                initialValues={groupValues}
                validationSchema={validationScheme}
                onSubmit={(o) => {
                  createGroup(o);
                }}
              >
                <Form className="mt-5 ">
                  <div className="w-full">
                    <div className={`w-72 md:w-full pr-2 pl-2 `}>
                      <FormikElementBuilder {...nameValues} />
                    </div>
                    <div className="w-72 md:w-full pl-2 pr-2">
                      <FormikElementBuilder {...descriptionlValues} />
                    </div>
                  </div>

                  <div className="w-72 md:w-full font-extralight rounded-md border-2 form-group flex flex-col  text-lg mt-5">
                    <button
                      disabled={isLoading}
                      type="submit"
                      className={`${colors.Buttons} p-1`}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </Formik>
            </ElementFrame>
          </div>
        )}
      </div>
    </>
  );
};
export { GroupCreation };
