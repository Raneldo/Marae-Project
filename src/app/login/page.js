import LoginForm from "./components/form";
import SessionProvider from "@/components/sessionProvider/SessionProvider";

export default function Page() {
  return (
    <div className="text-center mt-36">
      <SessionProvider>
        <LoginForm />
      </SessionProvider>
    </div>
  );
}
