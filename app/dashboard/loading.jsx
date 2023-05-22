const loading = () => {
  return (
    <div className="flex flex-col pb-10">
      <div className="w-64 h-4 bg-neutral rounded-full animate-pulse mb-2" />
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>No.</th>
              <th>Generated URL</th>
              <th>Actual URL</th>
              <th>Generated At</th>
              <th>Last Access</th>
              <th>Type</th>
              <th>Total Clicks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {[1, 2, 3, 4, 5, 6].map((index) => (
              <tr className="hover" key={index}>
                <td>
                  <div className="w-4 h-4 bg-neutral rounded-full animate-pulse" />
                </td>
                <td>
                  <div className="w-72 h-4 bg-neutral rounded-full animate-pulse" />
                </td>
                <td>
                  <div className="w-72 h-4 bg-neutral rounded-full animate-pulse" />
                </td>
                <td>
                  <div className="w-56 h-4 bg-neutral rounded-full animate-pulse" />
                </td>
                <td>
                  <div className="w-56 h-4 bg-neutral rounded-full animate-pulse" />
                </td>
                <td>
                  <div className="w-12 h-4 bg-neutral rounded-full animate-pulse" />
                </td>
                <td>
                  <div className="w-4 h-4 bg-neutral rounded-full animate-pulse" />
                </td>
                <td>
                  <button
                    className="btn btn-disabled cursor-not-allowed opacity-50"
                    disabled
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default loading