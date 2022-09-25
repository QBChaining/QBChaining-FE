import React, { Fragment, useEffect, useRef, useState } from "react";
import categories from "../../utils/category";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import InterestItem from "./../../components/register/InterestItem";
import styled from "styled-components";
import Select from "../../components/common/Select";
import WhiteArrow from "../../assets/images/WhiteArrow.png";
import { errorAlert } from "../../utils/swal";
import {
  postUserInfoDB,
  putUserInfoDB,
  putUserInNewDB,
} from "./../../redux/async/user";
import { successAlert } from "./../../utils/swal";
import { useNavigate } from "react-router-dom";
import { userSlice } from "./../../redux/modules/userSlice";

//에러처리
// {errors.nickname && errors.nickname.type === "required" && (
//   <p className={"warning"}>닉네임은 필수 입력사항 입니다.</p>
// )}
// {errors.nickname && errors.nickname.type === "minLength" && (
//   <p className={"warning"}>{errors.nickname.message}</p>
// )}
// {errors.nickname && errors.nickname.type === "maxLength" && (
//   <p className={"warning"}>{errors.nickname.message}</p>
// )}

//select component

//radio component
// const Radio = ({ register, options, name, ...rest }) => {
//   return (
//     <div>
//       {options.map(value => (
//         <Fragment key={value}>
//           <label htmlFor={value}>{value}</label>
//           <input
//             {...register(name)}
//             {...rest}
//             type="radio"
//             name={name}
//             value={value}
//             id={value}
//           />
//         </Fragment>
//       ))}
//     </div>
//   );
// };

//checkbox component
// const CheckBox = ({ register, options, name, ...rest }) => {
//   return (
//     <>
//       {options.map(value => (
//         <span style={{ padding: "10px", display: "inline-block" }} key={value}>
//           <input
//             {...register(name)}
//             {...rest}
//             type="checkbox"
//             name={name}
//             value={value}
//             id={value}
//           />
//           <label htmlFor={value}>{value}</label>
//         </span>
//       ))}
//     </>
//   );
// };

const Register = () => {
  const navigate = useNavigate();
  const { userName, userIsNew } = useSelector(state => state.userSlice);
  const [language, setLanguage] = useState([]);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [career, setCareer] = useState("");
  const [job, setJob] = useState("");
  const dispatch = useDispatch();

  const onSubmitHandler = () => {
    if (language.length < 1) {
      errorAlert("관심언어는 최소 한개 이상 선택해주세요!");
      return;
    }
    if (career.length < 1) {
      errorAlert("경력을 입력해주세요!");
      return;
    }
    if (age.length < 1) {
      errorAlert("나이를 입력해주세요!");
      return;
    }
    if (gender.length < 1) {
      errorAlert("성별을 입력해주세요!");
      return;
    }
    if (job.length < 1) {
      errorAlert("포지션을 입력해주세요!");
      return;
    }
    const data = {
      language,
      age,
      gender,
      career,
      job,
    };
    if (userIsNew) {
      dispatch(putUserInNewDB());
      dispatch(postUserInfoDB(data));
    } else if (!userIsNew) {
      dispatch(putUserInfoDB(data));
    }
    navigate(`/`);
  };

  return (
    <SRegister>
      <SRegisterTitle>
        <STitle>환영합니다.</STitle>
        <SSubTitle>
          여러분의 정보는 사이트 통계에 활용되며 안전하게 보호됩니다.
        </SSubTitle>
      </SRegisterTitle>
      <SSelectLangWrapper>
        <SLangTitle>
          관심언어를 선택해 주세요.
          <SLangSubtitle>최소 1개 이상 선택</SLangSubtitle>
        </SLangTitle>
        <SLangUl>
          {categories.interestCategory.map(data => (
            <InterestItem
              data={data}
              setLanguage={setLanguage}
              language={language}
              key={data.id}
            />
          ))}
        </SLangUl>
      </SSelectLangWrapper>
      <SelectWrapper>
        <Select
          options={categories.careerCategory}
          initialText={"경력을 입력해주세요"}
          setOption={setCareer}
          zIndex={11}
        />
      </SelectWrapper>
      <SelectWrapper>
        <Select
          options={categories.ageCategory}
          initialText={"나이를 입력해주세요"}
          setOption={setAge}
          zIndex={10}
        />
      </SelectWrapper>
      <SelectWrapper>
        <Select
          options={categories.genderCategory}
          initialText={"성별을 입력해주세요"}
          setOption={setGender}
          zIndex={9}
        />
      </SelectWrapper>

      <SelectWrapper>
        <SJobInput
          type="text"
          value={job}
          placeholder={"포지션을 입력해주세요.   예) 안드로이드 개발자"}
          onChange={e => {
            setJob(e.target.value);
          }}
        />
      </SelectWrapper>
      {/* <Radio name="gender" options={["남", "여"]} required />
      <CheckBox name="job" options={categories.jobs} /> */}
      <SSubmitButton onClick={onSubmitHandler}>
        <SButtonText>제출하기</SButtonText>
        <SButtonIcon />
      </SSubmitButton>
    </SRegister>
  );
};

export default Register;

const SRegister = styled.div`
  padding: 0 20px;
  max-width: 900px;
  margin: 0 auto;
`;

const SRegisterTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
`;

const STitle = styled.h2`
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const SSubTitle = styled.p`
  margin-bottom: 50px;
`;

const SSelectLangWrapper = styled.div`
  padding-bottom: 20px;
`;

const SLangUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const SLangTitle = styled.p`
  font-size: 18px;
  margin-bottom: 15px;
`;

const SLangSubtitle = styled.span`
  margin-left: 20px;
  font-size: 14px;
  color: ${props => props.theme.color.grey7};
`;

const SelectWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const SJobInput = styled.input`
  width: 100%;
  padding: 10px 30px;
  appearance: none;
  border: 1px solid #939393;
  border-radius: 100px;
`;

const SSubmitButton = styled.div`
  display: flex;
  float: right;
  align-items: center;
  padding: 10px;
  cursor: pointer;
`;

const SButtonText = styled.p`
  margin-right: 20px;
  font-size: 18px;
  font-weight: 500;
`;
const SButtonIcon = styled.div`
  position: relative;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${props => props.theme.color.mainOrange};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-image: url(${WhiteArrow});
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
`;
