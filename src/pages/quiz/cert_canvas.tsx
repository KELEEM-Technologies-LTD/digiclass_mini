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
    // console.log("position::", position);
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

        // console.log(canvas.width, canvas.height);

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

        // console.log(position);

        // console.log(canvas.width * (position?.course_name?.x / 100));
        // console.log(canvas.height * (position?.course_name?.y / 100));

        // Write the text onto the canvas
        /**course name */
        context.fillText(
          course.title,
          position === null
            ? canvas.width / 2
            : canvas.width * (position?.course_name?.x / 100) + 170,
          position === null
            ? canvas.height / 1.4
            : canvas.height * (position?.course_name?.y / 100) + 35
          // position.course_name?.width
        );
        /**
         * Student Name
         */
        context.font = "bold 24px Arial";
        context.fillText(
          cert.user_name,
          position === null
            ? canvas.width / 2
            : canvas.width * (position?.student_name?.x / 100) + 170,
          position === null
            ? canvas.height / 2.1
            : canvas.height * (position?.student_name?.y / 100) + 35
        );

        /**
         * Certificate code
         */
        context.fillText(
          cert.certificate_code,
          position === null
            ? canvas.width / 1.17
            : canvas.width * (position?.certificate_number?.x / 100) + 170,
          position === null
            ? canvas.height / 1.12
            : canvas.height * (position?.certificate_number?.y / 100) + 35
        );

        /**
         * Date generated
         */
        context.fillText(
          moment(cert.date_generated).format("MMM Do, YYYY"),
          position === null
            ? canvas.width / 1.615
            : canvas.width * (position?.date?.x / 100) + 170,
          position === null
            ? canvas.height / 1.12
            : canvas.height * (position?.date?.y / 100) + 35
        );

        /**
         * Instructor Name
         */
        const instructorNameArray = ins_name?.split(" ");
        // console.log(instructorNameArray);
        context.fillText(
          instructorNameArray.length > 2
            ? instructorNameArray?.[0] +
                " " +
                instructorNameArray?.[1]?.[0] +
                ". " +
                instructorNameArray?.[2]
            : instructorNameArray?.[0] + " " + instructorNameArray?.[1],
          position === null
            ? canvas.width / 2.58
            : canvas.width * (position?.instructor_name?.x / 100) + 170,
          position === null
            ? canvas.height / 1.12
            : canvas.height * (position?.instructor_name?.y / 100) + 35
        );

        // Convert the canvas to a PNG image and set the src attribute of an <img> tag
        const dataURL = canvas.toDataURL("image/png");
        const img = new Image();
        img.src = dataURL;
        window.document.getElementById("image-container")?.appendChild(img);
        // document.getElementById("image-container").appendChild(img);
      };
    }
  }, []);

  return (
    <>
      <div className="w-full h-full hidden md:flex justify-center items-center mb-2">
        <canvas ref={canvasRef} width={"995px"} height={"689px"} />
      </div>
      <div className="w-full h-full flex md:hidden justify-center items-center mb-3">
        <div id="image-container" className="w-full h-full mflex"></div>
      </div>
    </>
  );
}
