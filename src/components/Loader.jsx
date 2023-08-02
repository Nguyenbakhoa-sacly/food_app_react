

import React from 'react'
import styles from '../assets/css/Loader.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
const Loader = () => {
	return (
		<>
			<div aria-label="Orange and tan hamster running in a metal wheel" role="img" className={cx("wheel-and-hamster")}>
				<div className={cx("wheel")}></div>
				<div className={cx("hamster")}>
					<div className={cx("hamster__body")}>
						<div className={cx("hamster__head")}>
							<div className={cx("hamster__ear")}></div>
							<div className={cx("hamster__eye")}></div>
							<div className={cx("hamster__nose")}></div>
						</div>
						<div className={cx("hamster__limb", "hamster__limb--fr")}></div>
						<div className={cx("hamster__limb", "hamster__limb--fl")}></div>
						<div className={cx("hamster__limb", "hamster__limb--br")}></div>
						<div className={cx("hamster__limb", "hamster__limb--bl")}></div>
						<div className={cx("hamster__tail")}></div>
					</div>
				</div>
				<div className={cx("spoke")}></div>
			</div>
		</>
	)
}

export default Loader