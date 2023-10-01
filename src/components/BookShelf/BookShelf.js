import React, { useEffect, useState } from "react";

import "./bookShelf.css"
import { Book } from "../Book/Book";

import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks";
import { DataNft  } from "@itheum/sdk-mx-data-nft";
import {logout} from '@multiversx/sdk-dapp/utils/logout';
  
export const BookShelf = () => {
    // 545 is the nonce of the Hackathon Nested Novel
    const DATA_NFT_NONCES_I_WANT_TO_OPEN = [545]; 
    
    const { tokenLogin } = useGetLoginInfo();

    const [books,setBooks] = useState();
    const [dataStream,setDataStream] = useState();
    const [dataNftToOpen,setDataNftToOpen] = useState();
 

    async function viewData() {
        // set the network you want to use
        DataNft.setNetworkConfig("devnet");

        ///type of _nfts is DataNft[]
        const _nfts = await DataNft.createManyFromApi(DATA_NFT_NONCES_I_WANT_TO_OPEN.map((nonce) => ({ nonce })));
        const _dataNftToOpen = _nfts[0]; 
        // is important that the logged in user owns at least one data nft with the specified nonce
        setDataNftToOpen(_dataNftToOpen);

        if(_dataNftToOpen){
        try {
            let res ;
            if (!(tokenLogin && tokenLogin?.nativeAuthToken)) {
              throw Error("No nativeAuth token");
            }
             const arg = {
              mvxNativeAuthOrigins: [window.location.origin],
              mvxNativeAuthMaxExpirySeconds: 3000,
              fwdHeaderMapLookup: {
                "authorization": `Bearer ${tokenLogin?.nativeAuthToken}`,
              },
              stream: true,
            };

            res = await _dataNftToOpen.viewDataViaMVXNativeAuth(arg);
            // the response will be a blob 

             if (!res.error) {
              if (res.contentType.search("application/json") >= 0) {
                let response = await (res.data).text();
                response = JSON.stringify(JSON.parse(response), null, 4);
                response = JSON.parse(response);    // json object { data_stream : {...}, data:[{...}, {...}, {...}]}
                //uncomment to see the response format
                //console.log("Raw response : ", res.data);
                //console.log("When an index is not specified, the Data Marshal response provides information to start the UI : ", response)
                setDataStream(response.data_stream);
                setBooks(response.data);
            }
            } else {
              console.error(res.error);
             }
        } catch (err) {
          console.error(err);
          }
        }
      }
 
      useEffect(() => {
        viewData();
      }, [tokenLogin]);

    return(
      <>
        <button className="logout-button" onClick={() => logout(window.location.origin)}> Logout</button>
              <div id='shelf'>
                {books && books.map((book) => (
                    <Book
                      key={book.idx}
                      dataNftToOpen={dataNftToOpen}
                      nativeAuthToken={tokenLogin?.nativeAuthToken}
                      index={book.idx}
                      title={book.Title}
                      image={book.artwork}
                      category={book.category}
                      creator={dataStream.creator} 
                    />
                ))}
            </div>
         
        </> 
    );
}

