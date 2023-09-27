import React,{useState} from 'react'
import "./book.css"
 
export const Book = (props) => {
    const { dataNftToOpen, index, image, title,  creator, category, nativeAuthToken } = props;
    const [isActive, setIsActive] = useState(false);
 
      const illustrationStyle = {
        backgroundImage: 'url(' + image + ' )',
      };

      const handleBookClick = () => {
        setIsActive(true);
      };
    
      const handleBackClick = (event) => {
        event.stopPropagation();  
        setIsActive(false);
      };

      async function  getBookPdf(){

        // res type is ViewDataReturnType
        const res = await dataNftToOpen?.viewDataViaMVXNativeAuth({
            mvxNativeAuthOrigins: ["http://localhost:3000"],
            mvxNativeAuthMaxExpirySeconds: 3000,
            fwdHeaderMapLookup: {
              "authorization": `Bearer ${nativeAuthToken}`,
            },
            stream: true, // this ensure the data streams and "does not download"
            nestedIdxToStream: index  //get the book-(Pdf file) with idx : index
          });
          console.log("The raw response of data marshal when nestedIdxToStream is specified : ", res);
        if (!res.error) {
        // creating the pdfObject and open it in a new file
        const pdfObject = window.URL.createObjectURL(new Blob([res.data], { type: res.contentType }));
        window.open(pdfObject, "_blank")
          
        } else {
        console.error(res.error);
        }
    }

    const bookStyles = ["design","photo","graphic", "writing","landscape","web"]
    
    return (   
        <div className={`book-bg ${bookStyles[index]}  ${isActive ? 'active' : ''}`}
        onClick={handleBookClick}
        >
        <div className="book flex-column">
          <div id="book-shading"></div>

          <h5 className="author">{creator}</h5>
          <h1 className="title">{title}</h1>
          
          <div className="contents">
            <div id="back">
              <svg viewBox="0 0 512 512" width="100" title="chevron-circle-left"
               onClick={handleBackClick}>
                <path d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zM142.1 273l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L226.9 256l101.6-101.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L142.1 239c-9.4 9.4-9.4 24.6 0 34z" />
              </svg>
            </div>
            <div className="page">
              <div>
                <h1>{title}</h1>
                <h5>{category}</h5>

                <p className="text">
                  &emsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
                </p>
              </div>
               
              <div className="illus" style={illustrationStyle}></div>
            </div>
            <div className="page">
              <div className="illus" style={illustrationStyle}></div>
              <div>
                <p className="text">
                  &emsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit,   didunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru  sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
              <button className='open-button' onClick={getBookPdf}>Open pdf in a new file</button>
            </div>
            <div id="page-shading"></div>
          </div>
        </div>
      </div>
  
  );
}