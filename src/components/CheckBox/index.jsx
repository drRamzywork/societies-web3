"use client"
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const CheckBox = ({ societiesListSocieties, selectedSocietiesData,
  setSelectedSocietiesData }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [checkedStates, setCheckedStates] = useState([]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   if (societiesListSocieties && societiesListSocieties.length > 0) {
  //     setCheckedStates(new Array(societiesListSocieties.length).fill(false));
  //   }
  // }, [societiesListSocieties]);


  useEffect(() => {
    // Initialize the checkboxes and set all data as selected when the component mounts
    if (societiesListSocieties && societiesListSocieties.length > 0) {
      setCheckedStates(new Array(societiesListSocieties.length).fill(true));  // Set all checkboxes to true
      const allData = societiesListSocieties.flatMap(society => society.societies); // Collect all societies' data
      setSelectedSocietiesData(allData); // Set all data as selected
    }
  }, [societiesListSocieties, setSelectedSocietiesData]);


  const handleResize = () => {
    let screenWidth = window.visualViewport.width;
    setIsOpen(screenWidth >= 935);
  };

  const handleCheckboxChange = (index) => {
    const updatedCheckedStates = [...checkedStates];
    updatedCheckedStates[index] = !updatedCheckedStates[index];
    setCheckedStates(updatedCheckedStates);

    const societyData = societiesListSocieties[index].societies;
    if (updatedCheckedStates[index]) {
      // If checkbox is checked, add the society's data to the state
      setSelectedSocietiesData([...selectedSocietiesData, ...societyData]);
    } else {
      // If checkbox is unchecked, remove the society's data from the state
      const newData = selectedSocietiesData.filter(item => !societyData.includes(item));
      setSelectedSocietiesData(newData);
    }
  };

  // const toggleSelectAll = () => {
  //   const allSelected = checkedStates.every(Boolean);
  //   if (allSelected) {
  //     setSelectedSocietiesData([]);
  //     setCheckedStates(new Array(societiesListSocieties.length).fill(false));
  //   } else {
  //     const allData = societiesListSocieties.flatMap(society => society.societies);
  //     setSelectedSocietiesData(allData);
  //     setCheckedStates(new Array(societiesListSocieties.length).fill(true));
  //   }
  // };


  const toggleSelectAll = () => {
    const allSelected = checkedStates.every(Boolean);
    if (allSelected) {
      setSelectedSocietiesData([]);
      setCheckedStates(new Array(societiesListSocieties.length).fill(false));
    } else {
      const allData = societiesListSocieties.flatMap(society => society.societies);
      setSelectedSocietiesData(allData);
      setCheckedStates(new Array(societiesListSocieties.length).fill(true));
    }
  };






  return (
    <div className="check-container" dir="rtl">
      <div className="checkMenuIcon" onClick={() => setIsOpen((prev) => !prev)}>
        <GiHamburgerMenu />
      </div>

      {isOpen && (
        <div className="checkBoxes-con">
          <h3>اختيارات الخريطة</h3>
          <div className="markCheckCon">
            <div
              className="markCheck"
              onClick={() => toggleSelectAll()}
              style={{
                background: checkedStates[1] ? "rgb(142 142 142)" : "rgb(100 100 100)",
              }}
            >
              <label htmlFor={`show-${1}`} style={{ width: "100%" }}>
                <span>جميع جمعيات المملكة</span>
                <span style={{ width: "23px", height: "23px" }}>
                  <svg
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.30957 0C4.6089 0 0.80957 3.79933 0.80957 8.5C0.80957 13.2007 4.6089 17 9.30957 17C14.0102 17 17.8096 13.2007 17.8096 8.5C17.8096 3.79933 14.0102 0 9.30957 0Z"
                      fill={checkedStates[1] ? "black" : "#C2BFB2"} // Fill color based on specific 1
                    ></path>
                    <path
                      d="M4.39596 7.21096C4.33975 7.15506 4.28353 7.09916 4.20483 7.00972C4.62953 6.94939 5.04648 6.8852 5.45729 6.82196C6.03611 6.73286 6.60273 6.64563 7.16166 6.5737C7.54391 6.52898 7.76877 6.39482 7.93741 6.02588C8.30947 5.2159 8.70852 4.43275 9.12651 3.61243C9.17584 3.51561 9.22544 3.41827 9.27529 3.32031C9.29065 3.34705 9.3047 3.36988 9.31744 3.39057C9.34199 3.43044 9.36167 3.46239 9.37647 3.49919C9.60132 3.96316 9.8318 4.42434 10.0623 4.88552C10.2927 5.34669 10.5232 5.80787 10.7481 6.27184C10.8268 6.42836 10.9167 6.49544 11.0966 6.5178C11.9556 6.63594 12.7998 6.76146 13.6532 6.88837C13.8497 6.91759 14.0468 6.94689 14.2446 6.97618C14.2614 6.98177 14.2783 6.98457 14.2951 6.98736C14.312 6.99016 14.3289 6.99295 14.3457 6.99854C14.357 7.00972 14.3682 7.0237 14.3795 7.03767C14.3907 7.05165 14.402 7.06562 14.4132 7.0768C14.3968 7.08379 14.3804 7.0903 14.3642 7.09672C14.3027 7.12112 14.2441 7.14436 14.1996 7.1886C13.8286 7.54078 13.4632 7.89575 13.0978 8.25071C12.7324 8.60568 12.367 8.96064 11.996 9.31281C11.8723 9.42461 11.8386 9.53641 11.8723 9.70411C11.9998 10.3824 12.1172 11.0606 12.2346 11.7389C12.2933 12.078 12.352 12.4171 12.412 12.7563C12.4192 12.785 12.4172 12.8229 12.4148 12.8671C12.4134 12.8918 12.412 12.9183 12.412 12.9463C12.3604 12.9271 12.3163 12.9042 12.2732 12.8818C12.241 12.8652 12.2095 12.8488 12.1759 12.8345C11.2767 12.3651 10.3768 11.8953 9.46641 11.4147C9.34274 11.3476 9.24156 11.3476 9.11789 11.4147C8.20725 11.8842 7.29661 12.3649 6.38597 12.8457C6.34971 12.8697 6.31014 12.8873 6.26563 12.9071C6.22735 12.9242 6.18537 12.9428 6.13858 12.9687C6.19478 12.6557 6.23975 12.3762 6.28472 12.0967C6.40189 11.3879 6.52756 10.6874 6.65433 9.98079C6.67352 9.87381 6.69274 9.7667 6.71195 9.65939C6.74568 9.53641 6.71195 9.45815 6.62201 9.36871C5.87999 8.65319 5.13798 7.93767 4.39596 7.21096Z"
                      fill="#ECE7DC"
                    ></path>
                  </svg>
                </span>
              </label>
            </div>
            {societiesListSocieties && societiesListSocieties.map((society, index) => (
              <div
                key={index}
                className="markCheck"
                onClick={() => handleCheckboxChange(index)}
                style={{
                  background: checkedStates[index] ? "rgb(142 142 142)" : "rgb(100 100 100)",
                }}
              >
                <label htmlFor={`show-${index}`} style={{ width: "100%" }}>
                  <span>{society.name}</span>
                  <span style={{ width: "23px", height: "23px" }}>
                    <svg
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.30957 0C4.6089 0 0.80957 3.79933 0.80957 8.5C0.80957 13.2007 4.6089 17 9.30957 17C14.0102 17 17.8096 13.2007 17.8096 8.5C17.8096 3.79933 14.0102 0 9.30957 0Z"
                        fill={checkedStates[index] ? "black" : "#C2BFB2"} // Fill color based on specific index
                      ></path>
                      <path
                        d="M4.39596 7.21096C4.33975 7.15506 4.28353 7.09916 4.20483 7.00972C4.62953 6.94939 5.04648 6.8852 5.45729 6.82196C6.03611 6.73286 6.60273 6.64563 7.16166 6.5737C7.54391 6.52898 7.76877 6.39482 7.93741 6.02588C8.30947 5.2159 8.70852 4.43275 9.12651 3.61243C9.17584 3.51561 9.22544 3.41827 9.27529 3.32031C9.29065 3.34705 9.3047 3.36988 9.31744 3.39057C9.34199 3.43044 9.36167 3.46239 9.37647 3.49919C9.60132 3.96316 9.8318 4.42434 10.0623 4.88552C10.2927 5.34669 10.5232 5.80787 10.7481 6.27184C10.8268 6.42836 10.9167 6.49544 11.0966 6.5178C11.9556 6.63594 12.7998 6.76146 13.6532 6.88837C13.8497 6.91759 14.0468 6.94689 14.2446 6.97618C14.2614 6.98177 14.2783 6.98457 14.2951 6.98736C14.312 6.99016 14.3289 6.99295 14.3457 6.99854C14.357 7.00972 14.3682 7.0237 14.3795 7.03767C14.3907 7.05165 14.402 7.06562 14.4132 7.0768C14.3968 7.08379 14.3804 7.0903 14.3642 7.09672C14.3027 7.12112 14.2441 7.14436 14.1996 7.1886C13.8286 7.54078 13.4632 7.89575 13.0978 8.25071C12.7324 8.60568 12.367 8.96064 11.996 9.31281C11.8723 9.42461 11.8386 9.53641 11.8723 9.70411C11.9998 10.3824 12.1172 11.0606 12.2346 11.7389C12.2933 12.078 12.352 12.4171 12.412 12.7563C12.4192 12.785 12.4172 12.8229 12.4148 12.8671C12.4134 12.8918 12.412 12.9183 12.412 12.9463C12.3604 12.9271 12.3163 12.9042 12.2732 12.8818C12.241 12.8652 12.2095 12.8488 12.1759 12.8345C11.2767 12.3651 10.3768 11.8953 9.46641 11.4147C9.34274 11.3476 9.24156 11.3476 9.11789 11.4147C8.20725 11.8842 7.29661 12.3649 6.38597 12.8457C6.34971 12.8697 6.31014 12.8873 6.26563 12.9071C6.22735 12.9242 6.18537 12.9428 6.13858 12.9687C6.19478 12.6557 6.23975 12.3762 6.28472 12.0967C6.40189 11.3879 6.52756 10.6874 6.65433 9.98079C6.67352 9.87381 6.69274 9.7667 6.71195 9.65939C6.74568 9.53641 6.71195 9.45815 6.62201 9.36871C5.87999 8.65319 5.13798 7.93767 4.39596 7.21096Z"
                        fill="#ECE7DC"
                      ></path>
                    </svg>
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckBox;
