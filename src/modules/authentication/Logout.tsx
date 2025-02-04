import { Logo } from "@/lib/components/assets/logo/logo";
import useAuth from "@/modules/authentication/hooks/useAuth";
import { useEffect } from "react";

export const Logout = () => {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className={"mx-auto my-auto"}>
      <Logo full={true} className={"w-1/2 mx-auto animate-pulse"} />
      <div className="flex flex-col items-center justify-center mt-12 h-1/2">
        <div className="  px-4 md:px-8 lg:px-24 py-8 ">
          <p className="text-5xl animate-bounce font-bold tracking-wider text-gray-300">
            Logging out...
          </p>
        </div>
      </div>
    </div>
  );
};
