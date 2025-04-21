import { FiSearch, FiAlertTriangle } from "react-icons/fi";

const ChangelogOverview = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <span className="text-gray-700">Home</span> / Developer tools
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Changelog</h1>
        <p className="text-gray-600">
          Keep track of changes and upgrades to the Greptile API.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
            <option>Product</option>
            <option>Basil</option>
            <option>Acacia</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
            <option>Breaking changes</option>
            <option>All changes</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
            <option>Category All</option>
            <option>Billing</option>
            <option>API</option>
          </select>
        </div>
      </div>

      {/* Changelog Entry */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Basil</h2>
        <p className="text-gray-600 mb-6">Learn what's changing in Basil</p>

        {/* Version Entry */}
        <div className="border-l-2 border-gray-200 pl-6 mb-8">
          <div className="flex items-center mb-4">
            <h3 className="text-xl font-medium">2025-03-31.Basil</h3>
            <span className="ml-4 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full flex items-center">
              <FiAlertTriangle className="mr-1" /> Breaking changes
            </span>
          </div>

          {/* Changes Section */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Coupons enhancements</h4>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      Removes support for discount coupons that don't have a
                      specified end time
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">Billing</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      Removes coupon and promotion code parameters with
                      stackable discounts
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">Billing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Another Changes Section */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Increase Invoice flexibility</h4>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      Replaces top-level price fields with improved price
                      modeling on invoice items and invoice Line items
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      Billing + 1 more
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      Replaces top-level tax-related properties with improved
                      tax modeling on invoices, invoice Line Items, and Credit
                      Note Line Items
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      Billing + 1 more
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangelogOverview;
