export default function ResultsLoading() {
  return (
    <div className="flex flex-row justify-center items-center h-full w-full">
      <div className="w-20 h-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          {/* @ts-expect-error: transformOrigin seems not to be fixable */}
          <path fill="#799bd1" stroke="#799bd1" strokeWidth="10" transformOrigin="center" d="m148 84.7 13.8-8-10-17.3-13.8 8a50 50 0 0 0-27.4-15.9v-16h-20v16A50 50 0 0 0 63 67.4l-13.8-8-10 17.3 13.8 8a50 50 0 0 0 0 31.7l-13.8 8 10 17.3 13.8-8a50 50 0 0 0 27.5 15.9v16h20v-16a50 50 0 0 0 27.4-15.9l13.8 8 10-17.3-13.8-8a50 50 0 0 0 0-31.7Zm-47.5 50.8a35 35 0 1 1 0-70 35 35 0 0 1 0 70Z">
            <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="0;120" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
          </path>
        </svg>
      </div>

    </div>

  );
}
