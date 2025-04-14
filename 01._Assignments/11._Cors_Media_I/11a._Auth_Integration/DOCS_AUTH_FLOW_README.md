# Create a frontend that allows users to log in / sign up.

For the **DLS assignment** a service called _Clerk_ has been used, which is a complete suite of embeddable UIs, flexible APIs, and admin dashboards to authenticate and manage users.

Other approaches could be

- **betterauth**: A user-friendly authentication solution that simplifies the integration process while providing robust security features.
- **DIY**: Building your own authentication system, which requires more configuration and comes with a higher risk for security vulnerabilities.
- **Auth0**: A flexible, drop-in solution to add authentication and authorization services to your applications, supporting various identity providers and protocols.
- **Firebase Authentication**: A comprehensive authentication service that supports email/password, phone authentication, and social login providers, making it easy to integrate into web and mobile applications.
- **Okta**: An enterprise-level identity management service that provides secure authentication and user management, suitable for larger organizations with complex needs.
- **Keycloak**: An open-source identity and access management solution that offers features like _single sign-on_, user federation, and identity brokering.

---

<br>

## Researching

When considering how to implement an authentication flow, one must weigh the pros and cons of building a solution from scratch versus utilizing a service like _Clerk_. Building everything on your own can **provide complete control** over the authentication process, allowing for customization tailored to specific needs. However, this approach often **requires significant time and resources to develop, test, and maintain**. Additionally, handling security concerns, such as password storage and session management, can be complex and error-prone.

On the other hand, using a service like _Clerk_ **simplifies the authentication process** by managing user accounts, sessions, and security protocols.

_Clerk_ integrates seamlessly with various authentication methods, including _OAuth_, which allows users to log in using existing accounts from providers like _Google_ or _Facebook_. This not only enhances user experience but also reduces the burden of managing sensitive information.

Implement _OAuth_ on you own can be challengeing and especially _Apple SSO_ since it require only HTTPS conenctions, which mean you have to configure something like **reversed nginx proxy** to trigger https when local development.

[How to Setup Sign in with Apple](https://www.kyle-melton.com/blog/2022-02-how-to-setup-sign-in-with-apple)

<br>

#### Stateless vs statefull auth

In modern applications, **JSON Web Tokens (JWT)** are commonly used for stateless authentication. **JWTs** encapsulate user information and claims in a compact format, enabling secure transmission between the client and server without the need for session storage. This stateless approach is highly scalable, as it allows for easy distribution across multiple servers, making it ideal for applications expecting high traffic.

Conversely, stateful authentication requires the server to maintain session information, which can simplify user management but may introduce challenges in scaling and performance. As applications grow, managing sessions across distributed systems can become cumbersome.

By leveraging _Clerk_ the authentication process will be streamlined ensuring security and scalability. _Clerk_ handles the complexities of _OAuth_ and **JWT**, allowing me to focus on building a seamless user experience without the overhead of managing authentication infrastructure.

---

<br>

## Step by step integration of Clerk auth

### Frontend --> React app

##### 1. Setup the frontend application - React app using Vite

For simplicity we will use React app with Vite - have a go with following commands

```bash
npm create vite@latest clerk-react -- --template react-ts
cd clerk-react
npm install
npm run dev
```

##### 2. Install Clerk for React

```bash
npm install @clerk/clerk-react
```

##### 3. Configure API key

Register at **Clerk**, get an API key and add to `.env` file have a look at `.env.sample`:

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
```

##### 4. Import Clerk API key

Go to `main.tsx` file and import your Clerk API key.

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Added if statement to check secret it imported and exist to prevent TypeScript errors.
if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}
```

Stay at `main.tsx` and add `<ClerkProvider>` to implement session and user context to Clerk's hooks and components.
_Clerk_ recommends wrapping entire app at the entry point with `<ClerkProvider>` to make authentication globally accessible.

```typescript
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    // Here is the added
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </StrictMode>
);
```

##### 5. Add UI

_Clerk_ comes with prebuilt control components\_

`<SignedIn>`: Children of this component **can only be seen while signed in**.
`<SignedOut>`: Children of this component **can only be seen while signed out**.
`<UserButton />`: Shows the **signed-in user's avatar**. Selecting it opens a dropdown menu with account management options.
`<SignInButton />`: An unstyled component that links to the **sign-in page or displays the sign-in modal**.

Go to `App.tsx` and add the following:

```typescript
function App() {
  return (
    <>
      <header>
        <h1>Vite & React & Clerk - AUTHENTHICATION SIGNUP/SIGNIN FLOW </h1>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </>
  );
}
```

## HURRAY 🥳 CLERK HAS BEEN IMPLEMENTED AN READY FOR SIGNUP

#### Bonus

To add **OAUTH SSO** it has to be choosen in the Clerk Dashboard, navigate to the SSO connections page: https://dashboard.clerk.com/last-active?path=user-authentication/sso-connections

---

<br>

## Relevant links

[Clerk Docs](https://clerk.com/docs/quickstarts/react)
[Betterauth Docs](https://www.better-auth.com/docs/introduction)
