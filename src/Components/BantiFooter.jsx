const BantiFooter = () => {
    return(
        <div  style={{backgroundColor: "#537D5D", color: "#537D5D",position:"absolute",bottom:"100",width:"100%",zIndex:"2",height:"50px"}}>
                    <p>© 2023 Badass Bear. All rights reserved.</p>
                    <ul style={{listStyleType: "none", display: "block", justifyContent: "center", padding: 0}}>
                        <li  style={{backgroundColor: "#537D5D"}}><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li style={{backgroundColor: "#537D5D"}}><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        <li style={{backgroundColor: "#537D5D"}}><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                    </ul>
        </div>
    );

}
export default BantiFooter;