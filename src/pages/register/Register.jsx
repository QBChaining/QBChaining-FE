import React, { Fragment, useState } from "react";
import categories from "../../utils/category";
import styled from "styled-components";
import { axios } from "axios";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import InterestItem from "./../../components/register/InterestItem";
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
const Select = ({ register, options, name, ...rest }) => {
  return (
    <div>
      <select {...register(name)} {...rest}>
        {options.map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

//radio component
const Radio = ({ register, options, name, ...rest }) => {
  return (
    <div>
      {options.map(value => (
        <Fragment key={value}>
          <label htmlFor={value}>{value}</label>
          <input
            {...register(name)}
            {...rest}
            type="radio"
            name={name}
            value={value}
            id={value}
          />
        </Fragment>
      ))}
    </div>
  );
};

//checkbox component
const CheckBox = ({ register, options, name, ...rest }) => {
  return (
    <>
      {options.map(value => (
        <span style={{ padding: "10px", display: "inline-block" }} key={value}>
          <input
            {...register(name)}
            {...rest}
            type="checkbox"
            name={name}
            value={value}
            id={value}
          />
          <label htmlFor={value}>{value}</label>
        </span>
      ))}
    </>
  );
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm();
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const onSubmitHandler = data => {
    // console.log(data, list);
  };

  return (
    <>
      <div>
        <ul style={{ display: "flex", flexWrap: "wrap" }}>
          {categories.interestCategory.map(data => (
            <InterestItem
              data={data}
              setList={setList}
              list={list}
              key={data.interestId}
            />
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Select
          register={register}
          name="age"
          options={["10대", "20대", "30대"]}
        />
        <Radio
          register={register}
          name="gender"
          options={["남", "여"]}
          required
        />
        <CheckBox register={register} name="job" options={categories.jobs} />
        <Select register={register} name="career" options={categories.career} />
        <button type="submit" disabled={isSubmitting}>
          제출하기
        </button>
      </form>
    </>
  );
};

export default Register;
