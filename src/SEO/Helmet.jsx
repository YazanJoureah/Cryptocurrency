import { Helmet } from "react-helmet-async";

export default function Helmets(title, desc) {
  return (
    <Helmet title={title.title}>
      <meta name="description" content={desc} />
    </Helmet>
  );
}
