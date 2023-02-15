import BackgroundTheme from "./BackgroundTheme"
function Theme({changeTheme, changeStateMenu}) {
return (
    <div className="theme">
        <div className="background-theme">
            <BackgroundTheme changeTheme={changeTheme} changeStateMenu={changeStateMenu}/>
        </div>
    </div>
)
}
export default Theme