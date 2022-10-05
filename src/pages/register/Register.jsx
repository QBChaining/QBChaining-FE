import React, { useEffect, useState } from "react";
import categories from "../../utils/category";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//컴포넌트
import InterestItem from "./../../components/register/InterestItem";
import Select from "../../components/common/Select";

import { Helmet } from "react-helmet-async";

//알럿
import { errorAlert, successAlert } from "../../utils/swal";

//통신
import {
  postUserInfoDB,
  putUserInfoDB,
  putUserInNewDB,
} from "./../../redux/async/user";

//이미지
import WhiteArrow from "../../assets/images/WhiteArrow.png";

const Register = ({ isEdit, editData }) => {
  const navigate = useNavigate();
  const { userName, userIsNew } = useSelector(state => state.userSlice);
  const [language, setLanguage] = useState([]);
  const [age, setAge] = useState("나이를 입력해주세요");
  const [gender, setGender] = useState("성별을 입력해주세요");
  const [career, setCareer] = useState("경력을 입력해주세요");
  const [job, setJob] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit === undefined && userIsNew === "false") {
      navigate("/register/edit");
    }
    if (isEdit) {
      setLanguage(editData.languages);
      setAge(editData.age);
      setGender(editData.gender);
      setCareer(editData.career);
      setJob(editData.job);
    }
  }, [editData]);

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
    const regex = /^[0-9a-zA-Zㄱ-ㅎ가-힣 ]*$/;
    if (!regex.test(job)) {
      errorAlert("포지션엔 한글과 영문만 입력가능합니다!");
      return;
    }
    const data = {
      language,
      age,
      gender,
      career,
      job,
    };
    if (userIsNew === "true") {
      dispatch(putUserInNewDB());
      dispatch(postUserInfoDB(data));
    } else if (userIsNew === "false") {
      dispatch(putUserInfoDB(data));
    }
    successAlert(
      isEdit ? "정보가 수정 되었습니다." : "정보 등록이 되었습니다.",
    ).then(res => {
      (res.dismiss || res.isConfirmed) && navigate(`/mypage/${userName}`);
    });
  };

  const onKeyPress = e => {
    if (e.key === "Enter") {
      onSubmitHandler();
    }
  };
  return (
    <SRegister>
      <Helmet>
        <title>Register</title>
      </Helmet>
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
              isEdit={isEdit}
              data={data}
              setLanguage={setLanguage}
              language={language}
              language2={language}
              key={data.id}
            />
          ))}
        </SLangUl>
      </SSelectLangWrapper>
      <SelectWrapper>
        <Select
          isEdit={isEdit}
          options={categories.careerCategory}
          initialText={career}
          setOption={setCareer}
          zIndex={11}
        />
      </SelectWrapper>
      <SelectWrapper>
        <Select
          isEdit={isEdit}
          options={categories.ageCategory}
          initialText={age}
          setOption={setAge}
          zIndex={10}
        />
      </SelectWrapper>
      <SelectWrapper>
        <Select
          isEdit={isEdit}
          options={categories.genderCategory}
          initialText={gender}
          setOption={setGender}
          zIndex={9}
        />
      </SelectWrapper>
      <SelectWrapper>
        <SJobInput
          type="text"
          value={job || ""}
          placeholder={"포지션을 입력해주세요.   예) 안드로이드 개발자"}
          onChange={e => {
            setJob(e.target.value);
          }}
          maxLength="20"
          onKeyPress={onKeyPress}
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
  min-width: 1300px;
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
  width: 800px;
  margin: 0 auto;
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
  align-items: center;
  justify-content: center;
  width: 150px;
  margin: 0 auto;
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
  transition: 0.3s;
  background: ${props => props.theme.color.mainNavy};
  &:hover {
    background: ${props => props.theme.color.mainOrange};
  }

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
