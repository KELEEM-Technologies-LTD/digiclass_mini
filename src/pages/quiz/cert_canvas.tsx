import moment from "moment";
import { useEffect, useRef } from "react";

export default function CertificateCanvas(props: {
  cert: any;
  course: any;
  ins_name: any;
  cert_url: string;
}) {
  const { cert, course, ins_name, cert_url } = props;
  const canvasRef: any = useRef(null);

  useEffect(() => {
    if (!cert.user_name) {
      window.location.reload();
    } else {
      // console.log(course);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const image = new Image();
      // image.src =
      image.crossOrigin = "anonymous";
      image.src = process.env.PUBLIC_URL + cert_url;

      image.onload = () => {
        // Draw the image onto the canvas
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Set the font and text alignment
        context.font = "bold 24px Arial";
        context.textAlign = "center";
        // context.fillStyle = "red";
        const maxWidth = canvas.width / 1.8;
        const textWidth = context.measureText(course.title).width;

        if (textWidth > maxWidth) {
          const fontSize = Math.floor((24 * maxWidth) / textWidth);
          context.font = `bold ${fontSize}px Arial`;
        }

        // Write the text onto the canvas
        context.fillText(course.title, canvas.width / 2, canvas.height / 1.4);
        context.font = "bold 24px Arial";
        context.fillText(cert.user_name, canvas.width / 2, canvas.height / 2.1);

        context.fillText(
          cert.certificate_code,
          canvas.width / 1.17,
          canvas.height / 1.12
        );
        context.fillText(
          moment(cert.date_generated).format("MMM Do, YYYY"),
          canvas.width / 1.615,
          canvas.height / 1.12
        );

        context.fillText(ins_name, canvas.width / 2.58, canvas.height / 1.12);

        // Convert the canvas to a PNG image and set the src attribute of an <img> tag
        const dataURL = canvas.toDataURL("image/png");
        const img = new Image();
        img.src = dataURL;
        //   document.getElementById("image-container").appendChild(img);
      };
    }
  }, []);

  return (
    <>
      <div className="w-full h-full hidden md:flex justify-center items-center mb-2">
        <canvas ref={canvasRef} width={"995 px"} height={"689"} />
      </div>
      <div className="w-full h-full flex md:hidden justify-center items-center mb-3">
        <div id="image-container" className="w-full h-full mflex"></div>
      </div>
    </>
  );
}
