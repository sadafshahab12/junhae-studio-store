interface BankDetailsProps {
  total: number;
}

export const BankDetails: React.FC<BankDetailsProps> = ({ total }) => (
  <div className="mt-4 p-4 bg-gray-50 border border-gray-300 rounded-md">
    <h3 className="text-base font-semibold text-gray-900 mb-2">
      Transfer Details
    </h3>
    <p className="text-sm text-gray-700">
      Please transfer **${total.toFixed(2)}** to the following account and
      upload the proof of payment. Your order will be processed upon
      confirmation of the transfer.
    </p>
    <dl className="mt-3 space-y-1 text-sm">
      <div className="flex justify-between py-1 border-t border-gray-200">
        <dt className="font-medium text-gray-600">Bank Name:</dt>
        <dd className="text-gray-900">Juno Bank</dd>
      </div>
      <div className="flex justify-between py-1 border-t border-gray-200">
        <dt className="font-medium text-gray-600">Account Name:</dt>
        <dd className="text-gray-900">Junhae Studio Inc.</dd>
      </div>
      <div className="flex justify-between py-1 border-t border-gray-200">
        <dt className="font-medium text-gray-600">Account Number:</dt>
        <dd className="text-gray-900">1234567890</dd>
      </div>
      <div className="flex justify-between py-1 border-t border-gray-200">
        <dt className="font-medium text-gray-600">Routing Number:</dt>
        <dd className="text-gray-900">098765432</dd>
      </div>
    </dl>
  </div>
);
