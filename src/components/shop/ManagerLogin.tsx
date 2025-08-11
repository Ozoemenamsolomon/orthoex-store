"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

// Interfaces
interface FormData {
    email: string;
    password: string;
}

// Styled Components
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Box = styled.div`
  width: 90vw;
  max-width: 600px;
  text-align: center;
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;

  @media (min-width: 640px) {
    font-size: 1.5rem;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Input = styled.input`
  height: 2.75rem;
  width: 100%;
  background-color: #f9c44843;
  outline: none;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding-left: 0.5rem;
  font-size: 0.875rem;

  &::placeholder {
    color: #9ca3af;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
  height: 3rem;
  width: 100%;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 25%;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  margin-top: 1rem;
  width: 100%;
  height: 3rem;
  background-color: #f78002;
  color: #fff;
  font-weight: 500;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  transition: background 0.2s ease;

  &:hover {
    background-color: #a75502cc;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 1rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const SmallText = styled.p`
  font-size: 0.75rem;
`;

const StyledLink = styled(Link)`
  color: #f78002;
  font-weight: 500;
  font-size: 0.75rem;
  margin-left: 0.25rem;
`;

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <Container>
            <Box>
                <Title>Welcome back 👋</Title>

                <Form onSubmit={handleFormSubmit}>
                    <Input
                        type="email"
                        placeholder="Enter your email address"
                        autoComplete="off"
                        minLength={4}
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <PasswordWrapper>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            autoComplete="off"
                            minLength={4}
                            required
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <ToggleButton
                            onClick={(e) => {
                                e.preventDefault();
                                setShowPassword((prev) => !prev);
                            }}
                            type="button"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </ToggleButton>
                    </PasswordWrapper>

                    <SubmitButton type="submit">
                        <span>Login as Manager</span>
                    </SubmitButton>

                    <InfoSection>
                        <div>
                            <SmallText>
                                Don't have a account?
                                <StyledLink href="/signup">register</StyledLink>
                            </SmallText>
                        </div>
                        <div>
                            <SmallText>
                                Can't login?
                                <StyledLink href="">forgot password</StyledLink>
                            </SmallText>
                        </div>
                    </InfoSection>
                </Form>
            </Box>
        </Container>
    );
}
