import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as Components from '../components/login';

function LoginPage() {
    const [signIn, setSignIn] = useState(true);
    const navigate = useNavigate();

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        // Dummy sign-in: always succeeds
        navigate('/Homepage');
    };

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        // Dummy sign-up: always succeeds and slides to sign-in
        setSignIn(true);
    };

    return(
        <div style={{
            backgroundColor: '#000000',
            width: '100vw',  // Changed from minWidth to width
            height: '100vh', // Changed from minHeight to height
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
            padding: 0,
            overflow: 'hidden' // This prevents any potential scrollbars
          }}>
        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form onSubmit={handleSignUp}>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type='text' placeholder='Name' />
                    <Components.Input type='email' placeholder='Email' />
                    <Components.Input type='password' placeholder='Password' />
                    <Components.Button type="submit">Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>
                 <Components.Form onSubmit={handleSignIn}>
                     <Components.Title>Sign in</Components.Title>
                     <Components.Input type='email' placeholder='Email' />
                     <Components.Input type='password' placeholder='Password' />
                     <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                     <Components.Button type="submit">Sign In</Components.Button>
                 </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>
                <Components.LeftOverlayPanel signinIn={signIn}>
                    <Components.Title>Welcome Back!</Components.Title>
                    <Components.Paragraph>
                        To keep connected with us please login with your personal info
                    </Components.Paragraph>
                    <Components.GhostButton onClick={() => setSignIn(true)}>
                        Sign In
                    </Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel signinIn={signIn}>
                      <Components.Title>Hello, Friend!</Components.Title>
                      <Components.Paragraph>
                          Enter Your personal details and start journey with us
                      </Components.Paragraph>
                          <Components.GhostButton onClick={() => setSignIn(false)}>
                              Sign Up
                          </Components.GhostButton> 
                    </Components.RightOverlayPanel>
                </Components.Overlay>
            </Components.OverlayContainer>
        </Components.Container>
        </div>
    )
}

export default LoginPage;