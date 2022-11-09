import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

interface InformationProperties {
  title: string;
  description: string;
}

const Information = (props: InformationProperties) => (
  <Alert
    color="info"
    additionalContent={
      <div className="mt-2 mb-4 text-sm text-blue-700 dark:text-blue-800">
        {props.description}
      </div>
    }
    icon={HiInformationCircle}
  >
    <h3 className="text-lg font-medium text-blue-700 dark:text-blue-800">
      {props.title}
    </h3>
  </Alert>
);

export default Information;
