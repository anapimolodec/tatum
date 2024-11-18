import React, { useState } from "react";
import { strings, getNestedString } from "../constants/strings";
import { Button } from "@radix-ui/themes";
import { CheckIcon, EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("Login submitted:", { email, password });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">로그인</h2>
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
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
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
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
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

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" color="gray">
                {strings.cancel}
              </Button>
              <Button type="submit" variant="solid" color="teal">
                <CheckIcon />
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
