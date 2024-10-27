"use client";
import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.push(`/locations/${session.user.locationId}`);
    }
  }, [status]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: "", password: "" };

    if (formData.username.length < 2) {
      newErrors.username = "Username and Password Incorrect";
      isValid = false;
    }

    if (formData.username.length < 4) {
      newErrors.password = "Username and Password Incorrect";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const result = await signIn("credentials", {
        username: formData.username.trim(),
        password: formData.password.trim(),
        redirect: false,
      });

      if (result?.error) {
        console.error("Error signing in\n", result.error);
        setErrors({
          username: "Username and Password Incorrect",
          password: "Username and Password Incorrect",
        });
      } else {
        console.log("User successfully authorised");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-300 max-w-[500px] w-full rounded px-6 py-4 mx-auto text-start space-y-4"
    >
      <h1>&nbsp;Login</h1>
      <div className="flex flex-col gap-1 text-start">
        <Label htmlFor="username" className="">
          &nbsp;Username
        </Label>
        <Input
          placeholder=""
          name="username"
          id="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        
      </div>

      <div className="flex flex-col gap-1 text-start">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          placeholder=""
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password ? (
          <p className="text-destructive text-xs">{errors.password}</p>
        ) : (
          <p className="text-xs text-gray-600">&nbsp;</p>
        )}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
