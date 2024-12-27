import bolivianGiro from '../assets/bolivianGiro.png';
import { ToggleThemeButton } from './ToggleThemeButton';

export const Navbar = () => {
    return (
        <div className="navbar bg-base-200">
            <div className="flex-1 justify-around">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src={bolivianGiro} alt="BolivianGiroIcon Logo" />
                    </div>
                </div>
                <div>
                    <a className="btn btn-ghost text-xl">Calculator</a>
                    <a className="btn btn-ghost text-xl">Atm Withdraw</a>
                    <a className="btn btn-ghost text-xl">Conversion Chart</a>
                </div>
                <div>
                    <ToggleThemeButton />
                </div>
            </div>
        </div>
    )
}