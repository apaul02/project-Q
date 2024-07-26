import React from "react";
import Image from "next/image";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="feature-card text-center w-full md:w-1/3 px-4 mb-8 md:mb-0">
      <div className="flex justify-center mb-4">
        <Image
          src={icon}
          alt={title}
          width={67}
          height={67}
          className="object-contain"
        />
      </div>
      <h3 className="text-3xl font-normal mb-2 font-alata text-black">
        {title}
      </h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
