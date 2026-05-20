import SigninImage from "@/images/signin.png";
import * as m from "@/paraglide/messages";
import Image from "next/image";
import { getAdvantages } from "../../constant";

// component
export const SignupAdvantagesComponent = () => {
  return (
    <div className="hidden lg:block">
      <h2 className="text-3xl font-bold">{m.signup_advantages_title_1()}</h2>
      <h2 className="text-3xl font-bold mb-4">
        {m.signup_advantages_title_2()}{" "}
        <span className="text-primary">
          {m.signup_advantages_title_2_accent()}
        </span>
      </h2>

      <p className="text-gray-500 mb-6">{m.signup_advantages_description()}</p>

      <ul className="flex flex-col gap-4 mb-6">
        {getAdvantages().map((advantage) => (
          <li key={advantage.title} className="flex items-center gap-4">
            <div className="text-primary p-4 rounded-full bg-primary-soft">
              {advantage.icon}
            </div>

            <div>
              <p className="font-bold">{advantage.title}</p>

              <p className="text-gray-500 text-sm">{advantage.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <Image src={SigninImage} alt="Logo" className="w-[230px] h-[230px]" />
    </div>
  );
};
