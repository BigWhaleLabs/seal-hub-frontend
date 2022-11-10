import classnames, { stroke, strokeWidth } from 'classnames/tailwind'

const commonStroke = classnames(
  stroke('stroke-formal-accent'),
  strokeWidth('stroke-3')
)

export default function () {
  return (
    <svg
      width="224"
      height="223"
      viewBox="0 0 224 223"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M103.864 40.5294C108.617 36.7147 115.383 36.7147 120.136 40.5294L128.133 46.9464C130.607 48.9322 133.723 49.9445 136.892 49.7925L147.133 49.3011C153.221 49.009 158.694 52.9858 160.298 58.8661L162.995 68.7575C163.83 71.8187 165.756 74.4689 168.409 76.2088L176.983 81.8307C182.08 85.1728 184.17 91.6073 182.011 97.3071L178.379 106.895C177.255 109.862 177.255 113.138 178.379 116.105L182.011 125.693C184.17 131.393 182.08 137.827 176.983 141.169L168.409 146.791C165.756 148.531 163.83 151.181 162.995 154.242L160.298 164.134C158.694 170.014 153.221 173.991 147.133 173.699L136.892 173.208C133.723 173.055 130.607 174.068 128.133 176.054L120.136 182.471C115.383 186.285 108.617 186.285 103.864 182.471L95.8674 176.054C93.3927 174.068 90.2772 173.055 87.1079 173.208L76.8671 173.699C70.7791 173.991 65.3055 170.014 63.702 164.134L61.0047 154.242C60.17 151.181 58.2445 148.531 55.5911 146.791L47.0173 141.169C41.9203 137.827 39.8296 131.393 41.9887 125.693L45.6206 116.105C46.7446 113.138 46.7446 109.862 45.6206 106.895L41.9887 97.3071C39.8296 91.6074 41.9203 85.1728 47.0173 81.8307L55.5911 76.2088C58.2445 74.4689 60.17 71.8187 61.0047 68.7575L63.702 58.8661C65.3055 52.9858 70.7791 49.009 76.8671 49.3011L87.1079 49.7925C90.2772 49.9445 93.3927 48.9322 95.8674 46.9464L103.864 40.5294Z"
        className={commonStroke}
      />
      <path
        opacity="0.5"
        d="M95.4551 30.2771C105.121 22.5202 118.879 22.5202 128.545 30.2771V30.2771C133.577 34.3153 139.912 36.3737 146.357 36.0645V36.0645C158.736 35.4706 169.866 43.557 173.127 55.5141V55.5141C174.824 61.7388 178.739 67.1278 184.135 70.6657V70.6657C194.499 77.4616 198.751 90.5458 194.36 102.136V102.136C192.075 108.169 192.075 114.831 194.36 120.864V120.864C198.751 132.454 194.499 145.538 184.135 152.334V152.334C178.739 155.872 174.824 161.261 173.127 167.486V167.486C169.866 179.443 158.736 187.529 146.357 186.935V186.935C139.912 186.626 133.577 188.685 128.545 192.723V192.723C118.879 200.48 105.121 200.48 95.4551 192.723V192.723C90.4231 188.685 84.088 186.626 77.6435 186.935V186.935C65.264 187.529 54.1339 179.443 50.8733 167.486V167.486C49.1759 161.261 45.2606 155.872 39.8651 152.334V152.334C29.5008 145.538 25.2495 132.454 29.6398 120.864V120.864C31.9254 114.831 31.9254 108.169 29.6398 102.136V102.136C25.2495 90.5458 29.5008 77.4616 39.8651 70.6657V70.6657C45.2606 67.1278 49.1759 61.7388 50.8733 55.5142V55.5142C54.1339 43.557 65.264 35.4706 77.6435 36.0645V36.0645C84.088 36.3737 90.4231 34.3153 95.4551 30.2771V30.2771Z"
        className={commonStroke}
      />
      <path
        opacity="0.3"
        d="M92.4788 15.6656C103.884 6.51321 120.116 6.51321 131.521 15.6656V15.6656C137.458 20.4302 144.933 22.8589 152.537 22.4941V22.4941C167.144 21.7933 180.276 31.3345 184.123 45.4426V45.4426C186.126 52.7871 190.745 59.1455 197.112 63.3198V63.3198C209.34 71.3383 214.356 86.7763 209.176 100.451V100.451C206.48 107.57 206.48 115.43 209.176 122.549V122.549C214.356 136.224 209.34 151.662 197.112 159.68V159.68C190.745 163.854 186.126 170.213 184.123 177.557V177.557C180.276 191.666 167.144 201.207 152.537 200.506V200.506C144.933 200.141 137.458 202.57 131.521 207.334V207.334C120.116 216.487 103.884 216.487 92.4788 207.334V207.334C86.5416 202.57 79.0668 200.141 71.4629 200.506V200.506C56.8565 201.207 43.7242 191.666 39.877 177.557V177.557C37.8742 170.213 33.2546 163.854 26.8885 159.68V159.68C14.6597 151.662 9.64358 136.224 14.8237 122.549V122.549C17.5204 115.43 17.5204 107.57 14.8237 100.451V100.451C9.64358 86.7763 14.6597 71.3383 26.8885 63.3198V63.3198C33.2546 59.1455 37.8742 52.7871 39.877 45.4426V45.4426C43.7242 31.3345 56.8565 21.7933 71.4629 22.4941V22.4941C79.0668 22.8589 86.5416 20.4302 92.4788 15.6656V15.6656Z"
        className={commonStroke}
      />
    </svg>
  )
}
