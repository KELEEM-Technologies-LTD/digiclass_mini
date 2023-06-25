import moment from "moment";
import { useEffect, useRef } from "react";

export default function CertificateCanvas(props: {
  cert: any;
  course: any;
  ins_name: any;
  cert_url: string;
  position: any;
}) {
  const { cert, course, ins_name, cert_url, position } = props;
  const canvasRef: any = useRef(null);

  useEffect(() => {
    if (!cert.user_name) {
      window.location.reload();
    } else {
      // console.log(course);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const image = new Image();
      if (cert_url) {
        image.crossOrigin = "anonymous";
        image.src = process.env.PUBLIC_URL + cert_url;
      } else {
        image.src = process.env.PUBLIC_URL + "/img/cert.png";
      }
      // image.src =

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

        // console.log(canvas.width);

        // Write the text onto the canvas
        context.fillText(
          course.title,
          position === null ? canvas.width / 2 : position?.course?.width,
          position === null ? canvas.height / 1.4 : position?.course?.height
        );
        context.font = "bold 24px Arial";
        context.fillText(
          cert.user_name,
          position === null ? canvas.width / 2 : position?.student?.width,
          position === null ? canvas.height / 2.1 : position?.student?.height
        );

        context.fillText(
          cert.certificate_code,
          position === null
            ? canvas.width / 1.17
            : position?.cert_number?.width,
          position === null
            ? canvas.height / 1.12
            : position?.cert_number?.height
        );
        context.fillText(
          moment(cert.date_generated).format("MMM Do, YYYY"),
          position === null
            ? canvas.width / 1.615
            : position?.date_signed?.width,
          position === null
            ? canvas.height / 1.12
            : position?.date_signed?.height
        );

        context.fillText(
          ins_name,
          position === null ? canvas.width / 2.58 : position?.instructor?.width,
          position === null
            ? canvas.height / 1.12
            : position?.instructor?.height
        );

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
