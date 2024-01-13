import { tittleFont } from "@/config/fonts";

interface Props {
  title: string;
  subtitle?: string;
  clasname?: string;
}

export const Title = ({ title, subtitle, clasname }: Props) => {
  return (
    <div className={`mt-3 ${clasname}`}>
      <h1 className={`${tittleFont.className} antialiased text-4xl font-semibold my-10`}>{title}</h1>
      {subtitle && <h3 className="text-xl mb-5">{subtitle}</h3>}
    </div>
  );
};
