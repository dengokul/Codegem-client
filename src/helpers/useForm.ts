import { useState, useEffect, useCallback } from "react";
let thisError: any = {}
interface setSTateType {
  [name: string]: any;
}

const useForm = (initialValues:setSTateType = {}, callback: Function, validate: any) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(thisError);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) callback();
    // eslint-disable-next-line
  }, [errors]);

  const handleSubmit = useCallback(e => {
    if (e) e.preventDefault();
    setErrors(false);
    if (validate === undefined) setErrors({});
    if (validate === null) setErrors({});
    if (validate !== undefined && validate) setErrors(validate(values));
    setIsSubmitting(true);
    // eslint-disable-next-line
  }, [values]);

  const handleCurrentVal = (obj: any) => {
    setValues(obj);
  };

  const resetForm = useCallback(() => {
    setIsSubmitting(false);
    setErrors({});
    setValues(initialValues);
    // eslint-disable-next-line
  }, []);

  const setUpdateValue = useCallback((field, value) => {
    setValues(values => ({
      ...values,
      [field]: value
    }));
  }, []);

  const handleChange = useCallback(e => {
    e.persist();
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value
    }));
  }, []);

  const handleNumberChange = useCallback(e => {
    e.persist();
    if(isNaN(e.target.value)) return;
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value
    }));
  }, []);

  const handleKeyPress = useCallback(
    e => {
      if (!/^\d{1,10}(\.\d{0,4})?$/.test(e.target.value)) {
        e.persist();
        return null;
      }
      let thisName = e.target.name;
      let thisValue = e.target.value;
      setValues(values => ({
        ...values,
        [thisName]: thisValue
      }));
      // eslint-disable-next-line
    },
    // eslint-disable-next-line
    [values]
  );

  const handleDateChange = useCallback((date, name = "date") => {
    date = new Date(date);
    let value = date.getTime();
    setValues(values => ({
      ...values,
      [name]: value
    }));
    // eslint-disable-next-line
  }, []);

  const handleSelectChange = useCallback((e, name = "select") => {
    let value = e ? e.value : null;
    setValues(values => ({
      ...values,
      [name]: value
    }));
    // eslint-disable-next-line
  }, []);

  const handleRadioChange = useCallback(e => {
    let value = e.target.value;
    let name = e.target.name;
    setValues(values => ({
      ...values,
      [name]: value
    }));
    // eslint-disable-next-line
  }, []);

  const handleMultiSelectChange = useCallback((e, name = "mselect") => {
    let itemIds:any[] = [];
    if (e !== null && e.length > 0) {
      e.forEach((item: any) => {
        itemIds.push(item.value);
      });
    }

    setValues(values => ({
      ...values,
      [name]: itemIds,
      [name + "Label"]: e
    }));

    // eslint-disable-next-line
  }, []);

  const handleCheckboxChange = useCallback((value, name = "checkbox") => {
    setValues(values => ({
      ...values,
      [name]: value
    }));
    // eslint-disable-next-line
  }, []);

  const handleFileChange = useCallback(e => {
    e.persist();
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.files[0]
    }));
    // eslint-disable-next-line
  }, []);

  const handleSelectDefault = useCallback((e, name = "select") => {
    let value = e ? e.target.value : null;
    setValues(values => ({
      ...values,
      [name]: value
    }));
    // eslint-disable-next-line
  }, []);

  return {
    handleChange,
    handleNumberChange,
    handleDateChange,
    handleSelectChange,
    handleKeyPress,
    handleMultiSelectChange,
    handleSubmit,
    values,
    setUpdateValue,
    errors,
    resetForm,
    handleCurrentVal,
    handleCheckboxChange,
    handleFileChange,
    handleRadioChange,
    handleSelectDefault
  };
};

export default useForm;
