import { colors } from "../Constants/Patterns";
import { MYFormikValues } from "../Types/@StructureTypes";


export const confirmPasswordValues: MYFormikValues = {
    Title: "Confirm Password",
    element: "confirmPassword",
    type: "text",
    placeholder: "Confirm Password",
    textbox: true,
    required: false,
    hidden: false,
    width: "full",
  };
  
  export const oldPasswordValues: MYFormikValues = {
    Title: "Old Password",
    element: "oldPassword",
    type: "text",
    placeholder: "Old Password",
    textbox: true,
    required: false,
    hidden: false,
    width: "full",
  };
  
  export const newPasswordValues: MYFormikValues = {
    Title: "New Password",
    element: "newPassword",
    type: "text",
    placeholder: "New Password",
    textbox: true,
    required: false,
    hidden: false,
    width: "full",
  };
  
  
  export const emailValues: MYFormikValues = {
    Title: "Email Address",
    element: "email",
    type: "text",
    placeholder: "Email Address",
    textbox: true,
    required: false,
    hidden: false,
    width: "full",
  };


  
  export const userNameValues: MYFormikValues = {
    Title: "User Name",
    element: "userName",
    type: "text",
    placeholder: "User Name",
    textbox: true,
    required: false,
    hidden: false,
    width: "full",
  };
  
  export const prefixValues: MYFormikValues = {
    Title: "Prefix",
    element: "prefix",
    type: "text",
    textbox: true,
    placeholder: "Prefix",
    required: false,
    hidden: false,
    width: "full",
  };
  
  export const firstNameValues: MYFormikValues = {
    Title: "First Name",
    element: "first_Name",
    type: "text",
    textbox: true,
    placeholder: "First Name",
    required: false,
    hidden: false,
    width: "full",
  };
  export const lastNameValues: MYFormikValues = {
    Title: "Last Name",
    element: "last_Name",
    type: "text",
    textbox: true,
    placeholder: "Last Name",
    required: false,
    hidden: false,
    width: "full",
  };
  
  export const pronounsValues: MYFormikValues = {
    Title: "Pronouns",
    element: "pronouns",
    type: "text",
    textbox: true,
    placeholder: "Pronouns",
    required: false,
    hidden: false,
    width: "full",
  };
  
  export const bioValues: MYFormikValues = {
    Title: "Bio",
    element: "bio",
    type: "text",
    textbox: true,
    placeholder: "Bio",
    required: false,
    hidden: false,
    width: "full",
    as: "textarea",
  };
  
  export const GroupNameValues: MYFormikValues = {
    Title: "Group Name",
    element: "name",
    type: "text",
    placeholder: "Group Name",
    textbox: true,
    required: true,
    hidden: false,
    width: "full",
  };
  export const GroupDescriptionValues: MYFormikValues = {
    Title: "Group Description",
    element: "description",
    type: "text",
    placeholder: "Group Description",
    textbox: true,
    required: true,
    hidden: false,
    width: "full",
    as: "textarea",
    tailwind: "resize-none",
  };
  export const GroupRulesValues: MYFormikValues = {
    Title: "Rules",
    element: "groupRules",
    type: "text",
    placeholder: "Group Rules",
    textbox: true,
    required: false,
    hidden: false,
    width: "full",
    as: "textarea",
  };
  export const GroupNewAdminEmailValues: MYFormikValues = {
    Title: "Change Admin",
    element: "newAdminEmail",
    type: "text",
    placeholder: "New Admin Email",
    textbox: true,
    required: false,
    hidden: false,
    width: "full",
  };
  
  export const nameValues: MYFormikValues = {
    Title: "Group Name",
    element: "name",
    type: "text",
    placeholder: "Group Name",
    required: true,
    hidden: false,
    textbox: true,
    width: "full",
  };
  export const descriptionlValues: MYFormikValues = {
    Title: "Group Description",
    element: "description",
    type: "text",
    placeholder: "Group Description",
    required: true,
    hidden: false,
    textbox: true,
    width: "full",
  };
  export const linkFieldValues: MYFormikValues = {
    Title:"Link",
    element: "link",
    type: "text",
    placeholder: "Link (optional)",
    required: false,
    hidden: false,
    textbox: true,
    width: "full",
  };
  
  export const titleFieldValues: MYFormikValues = {
    Title:"Title",
    element: "title",
    type: "text",
    placeholder: "Title",
    required: true,
    hidden: false,
    textbox: true,
    width: "full",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value,
  };
  export const keyFieldValues: MYFormikValues = {
    Title:"Key-Words",
    element: "keyWords",
    type: "text",
    placeholder: "Key Words (optional)",
    required: false,
    hidden: false,
    textbox: true,
    width: "full",
  };
  export const imageFieldValues: MYFormikValues = {
    element: "imageURL",
    type: "hidden",
    placeholder: "",
    required: false,
    hidden: true,
  };
  
  export const textFieldValues: MYFormikValues = {
    Title:"Text",
    element: "text",
    type: "text",
    placeholder: "Text",
    required: true,
    hidden: false,
    as: "textarea",
    classes: `${colors.TextBox} h-20 overflow-y-auto whitespace-pre-wrap resize-none`,
    width: "full",
  };


  export const passwordValues: MYFormikValues = {
    Title: "Password",
    element: "password",
    type: "text",
    placeholder: "Password",
    textbox: true,
    required: true,
    hidden: false,
    width: "full",
  };
