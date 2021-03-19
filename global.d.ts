declare module '*.css'
declare module '*.scss'

declare module 'classnames' {
	type ClassName = string | null | undefined | {[className: string]: boolean}
	function classNames(...classNames: ClassName[]): string
	export default classNames
}
