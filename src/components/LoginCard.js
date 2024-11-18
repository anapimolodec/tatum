import React, { useState, useEffect } from "react";
import { strings, getNestedString } from "../constants/strings";
import { Button } from "@radix-ui/themes";
import {
  CheckIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  EnterIcon,
} from "@radix-ui/react-icons";
import { useStore } from "../store/useStore";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const { login, loginError, isLoading, clearError } = useStore();

  const validateEmail = (email) => {
    if (!email) {
      return getNestedString("auth.email_required");
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return getNestedString("auth.password_required");
    }
    return "";
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (loginError) {
      clearError();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const validationError =
      name === "email" ? validateEmail(value) : validatePassword(value);

    setError(validationError);
  };

  const handleCancelInput = () => {
    setFormData({
      email: "",
      password: "",
    });
    setError("");
    setShowPassword(false);
    clearError();
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = formData.email && emailRegex.test(formData.email);
    const isPasswordValid = formData.password;
    setIsValid(isEmailValid && isPasswordValid && !error);
  }, [formData, error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isValid) {
      const success = await login(formData.email, formData.password);
      if (success) {
        console.log("Login successful!");
      } else {
        const currentError = useStore.getState().error;
        setError(currentError);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-start mb-6 gap-1">
            <div className="bg-teal-400 p-1 rounded-sm">
              <EnterIcon />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {getNestedString("auth.login")}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-xs text-gray-500 font-bold"
              >
                {getNestedString("auth.email")}
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md text-sm border-gray-300"
                type="email"
                placeholder={getNestedString("auth.type_email")}
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-xs text-gray-500 font-bold"
              >
                {getNestedString("auth.password")}
              </label>
              <div className="relative">
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md text-sm border-gray-300"
                  type={showPassword ? "text" : "password"}
                  placeholder={getNestedString("auth.type_password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {!showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </button>
              </div>
            </div>

            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            <div className="flex justify-end space-x-3 pt-6">
              <Button
                variant="outline"
                color="gray"
                onClick={handleCancelInput}
                type="button"
              >
                {strings.cancel}
              </Button>
              <Button
                type="submit"
                variant="solid"
                color="teal"
                disabled={!isValid}
                className={!isValid ? "opacity-50 cursor-not-allowed" : ""}
              >
                {isValid && <CheckIcon />}
                {getNestedString("auth.login_action")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
