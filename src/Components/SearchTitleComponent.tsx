import { useEffect, useState } from "react";
import { useSearch } from "../CustomHooks/useSearch";
import { colors } from "../Constants/Patterns";

function SearchTitleComponent() {
  const SearchContext = useSearch();
  const [mainTitle, setMainTitle] = useState("");
  const [searchElement, setSearchElement] = useState("");

  useEffect(() => {
    if (
      SearchContext.postSearch.KeyWords ||
      SearchContext.postSearch.Title ||
      SearchContext.postSearch.UserName || SearchContext.postSearch.Voted
    ) {
      setMainTitle("Post");
      if (SearchContext.postSearch.KeyWords) {
        setSearchElement("Key words");
      }
      if (SearchContext.postSearch.Title) {
        setSearchElement("Title");
      }
      if (SearchContext.postSearch.UserName) {
        setSearchElement("UserName");
      }
      if (SearchContext.postSearch.Voted) {
        setSearchElement("Voted on");
      }
    }
    if (
      SearchContext.userSearch.FirstName ||
      SearchContext.userSearch.LastName ||
      SearchContext.userSearch.UserName
    ) {
      setMainTitle("User");
      if (SearchContext.userSearch.FirstName) {
        setSearchElement("First Name");
      }
      if (SearchContext.userSearch.LastName) {
        setSearchElement("Last Name");
      }
      if (SearchContext.userSearch.UserName) {
        setSearchElement("UserName");
      }
    }
  }, [
    SearchContext.postSearch.KeyWords,
    SearchContext.postSearch.Title,
    SearchContext.postSearch.UserName,
    SearchContext.userSearch.FirstName,
    SearchContext.userSearch.LastName,
    SearchContext.userSearch.UserName,
    SearchContext.postSearch.Voted
  ]);

  return (
    <>
      <div
        className={`flex flex-col items-center p-4 ${colors.ElementFrame} rounded-md shadow-md`}
      >
        <div className={`text-4xl font-bold mb-2`}>{mainTitle}</div>
        <div className="w-full text-3xl max-w-md">{searchElement}</div>
      </div>
    </>
  );
}

export default SearchTitleComponent;
