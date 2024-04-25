import { useNavigate } from "react-router-dom";

export default function NoMatch() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="h-screen w-screen  flex items-center">
        <div className="container flex flex-col md:flex-row items-center justify-center px-5 ">
          <div className="max-w-md">
            <div className="text-5xl font-dark font-bold">404</div>
            <p className="text-2xl md:text-3xl font-light leading-normal">
              Sorry, we couldn’t find the page you’re looking for.
            </p>

            <button
              onClick={() => navigate(-1)}
              className="px-4 mt-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
