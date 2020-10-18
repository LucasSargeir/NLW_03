import {StyleSheet, Dimensions} from 'react-native';

const Dw = Dimensions.get("window").width;
const Dh = Dimensions.get("window").height;


const styles = StyleSheet.create({
    container:{
        flex:1
    },
    map:{
        width: Dw,
        height: Dh
    },
    calloutContainer:{
        width:160,
        height:46,
        paddingHorizontal: 16,
        backgroundColor: "rgba(255,255,255,0.8)",
        borderRadius: 16,
        justifyContent:'center',
    },
    calloutText:{
        color: "#0089a5",
        fontFamily: "nunito700",
        fontSize: 14
    },
    footer:{
        position: "absolute",
        left: 24,
        right:24,
        bottom: 32,

        backgroundColor:"#FFF",
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: "row",
        alignItems:"center",
        justifyContent: "space-between",

        elevation:3
    },
    footerText:{
        fontFamily: "nunito700",
        color: "#8fa7b3"
    },
    createOrphanageButton:{
        width: 56,
        height: 56,
        backgroundColor: "#15c3d3",
        
        alignItems:"center",
        justifyContent:"center",

        borderRadius: 20
    }
})

export default styles;