type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  gitHub: (props: IconProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
  k8s: (props: IconProps) => (
    <svg
      {...props}
      viewBox="0 0 11 11"
      fill="#B7B7B7"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.49967 1.51436e-09C5.32724 1.79214e-05 5.18743 0.159004 5.18745 0.355119C5.18745 0.358129 5.18806 0.361005 5.18812 0.363997C5.18787 0.390645 5.18661 0.422747 5.18745 0.445948C5.19157 0.559062 5.21565 0.645634 5.23015 0.749848C5.25641 0.972899 5.27842 1.1578 5.26484 1.32965C5.25163 1.39445 5.205 1.45372 5.16344 1.49492L5.1561 1.63013C4.96873 1.64603 4.7801 1.67513 4.5917 1.71891C3.781 1.90734 3.083 2.33481 2.55159 2.91198C2.51711 2.8879 2.45678 2.8436 2.43884 2.83003C2.3831 2.83773 2.32676 2.85534 2.25338 2.81159C2.11365 2.71531 1.9864 2.58241 1.83241 2.42232C1.76186 2.34574 1.71076 2.27282 1.62694 2.19901C1.6079 2.18225 1.57885 2.15957 1.55755 2.14233C1.49202 2.08884 1.41472 2.06094 1.34007 2.05833C1.24409 2.05496 1.15169 2.09338 1.09122 2.17101C0.98373 2.30902 1.01815 2.51997 1.16794 2.64222C1.16946 2.64346 1.17108 2.64443 1.17261 2.64564C1.1932 2.66272 1.21841 2.68461 1.23733 2.69891C1.32628 2.76614 1.40754 2.80056 1.49618 2.85393C1.68291 2.97198 1.83772 3.06986 1.9605 3.18788C2.00845 3.2402 2.01683 3.33239 2.02322 3.37227L2.12329 3.46378C1.58758 4.28905 1.33965 5.30842 1.48617 6.34707L1.35541 6.386C1.32095 6.43156 1.27225 6.50324 1.22132 6.52463C1.06067 6.57643 0.879864 6.59545 0.661587 6.61888C0.559108 6.6276 0.470685 6.6224 0.362042 6.64346C0.33813 6.6481 0.304812 6.65699 0.278649 6.66327C0.27774 6.66346 0.27689 6.66374 0.275981 6.66395C0.274555 6.66429 0.272681 6.665 0.271311 6.66532C0.0872844 6.71083 -0.0309347 6.88398 0.00712403 7.05458C0.0451917 7.22522 0.224945 7.32899 0.410076 7.28814C0.411412 7.28783 0.413353 7.28778 0.414746 7.28746C0.416836 7.28697 0.418676 7.28593 0.42075 7.28541C0.446557 7.27961 0.478898 7.27316 0.501474 7.26697C0.608287 7.2377 0.685645 7.19468 0.781672 7.15702C0.988259 7.08117 1.15936 7.01781 1.32606 6.99312C1.39568 6.98754 1.46903 7.03709 1.50552 7.058L1.64161 7.0341C1.9548 8.02805 2.61113 8.83144 3.44222 9.33554L3.38551 9.47486C3.40595 9.52895 3.4285 9.60215 3.41327 9.65557C3.35267 9.81644 3.24887 9.98624 3.13066 10.1755C3.07343 10.263 3.01486 10.3309 2.96321 10.4309C2.95085 10.4549 2.93512 10.4917 2.92319 10.517C2.84294 10.6928 2.9018 10.8952 3.05595 10.9711C3.21106 11.0476 3.40359 10.967 3.48692 10.7908C3.48704 10.7906 3.48747 10.7904 3.48758 10.7902C3.48767 10.79 3.4875 10.7897 3.48758 10.7895C3.49945 10.7645 3.51627 10.7317 3.52628 10.7082C3.57051 10.6045 3.58523 10.5156 3.61634 10.4152C3.69895 10.2028 3.74434 9.97994 3.85806 9.84106C3.8892 9.80303 3.93997 9.78841 3.99261 9.77398L4.06332 9.64286C4.78785 9.92754 5.59884 10.0039 6.40898 9.81564C6.59379 9.77268 6.77221 9.71709 6.94469 9.65037C6.96457 9.68646 7.0015 9.75583 7.01141 9.7733C7.0649 9.79111 7.12328 9.80031 7.17085 9.87232C7.25594 10.0211 7.31412 10.1972 7.385 10.4098C7.41612 10.5101 7.43149 10.599 7.47574 10.7028C7.48582 10.7264 7.50255 10.7597 7.51443 10.7847C7.59758 10.9614 7.79072 11.0423 7.94607 10.9657C8.10019 10.8897 8.15912 10.6873 8.07883 10.5115C8.0669 10.4862 8.05049 10.4494 8.03813 10.4255C7.98648 10.3254 7.92792 10.2582 7.87068 10.1708C7.75247 9.98147 7.65443 9.82421 7.59382 9.66335C7.56848 9.58038 7.59809 9.52878 7.61784 9.47486C7.60601 9.46099 7.58072 9.38264 7.5658 9.34579C8.4295 8.82375 9.06656 7.99041 9.36574 7.02795C9.40614 7.03445 9.47636 7.04717 9.49917 7.05185C9.54612 7.02015 9.5893 6.97879 9.67396 6.98561C9.84065 7.01029 10.0117 7.07367 10.2183 7.14951C10.3144 7.18717 10.3917 7.23088 10.4985 7.26015C10.5211 7.26633 10.5535 7.2721 10.5793 7.2779C10.5813 7.27842 10.5832 7.27946 10.5853 7.27995C10.5867 7.28027 10.5886 7.28032 10.5899 7.28063C10.7751 7.32143 10.9549 7.21772 10.9929 7.04707C11.0309 6.87646 10.9127 6.70327 10.7287 6.65781C10.7019 6.65157 10.664 6.64099 10.638 6.63595C10.5293 6.61489 10.4409 6.62008 10.3384 6.61137C10.1201 6.58795 9.93935 6.56891 9.7787 6.51712C9.71319 6.49111 9.6666 6.41133 9.64393 6.37849L9.51785 6.34093C9.58322 5.85678 9.56559 5.3529 9.45247 4.84875C9.33829 4.33989 9.1365 3.8745 8.86739 3.46446C8.89973 3.43437 8.96081 3.379 8.97813 3.36271C8.98319 3.30536 8.97884 3.24523 9.03684 3.18173C9.15962 3.06371 9.31444 2.96584 9.50117 2.84779C9.5898 2.79441 9.67173 2.76 9.76068 2.69276C9.7808 2.67756 9.80827 2.65348 9.8294 2.63608C9.97917 2.51378 10.0136 2.30285 9.90612 2.16486C9.79859 2.02688 9.59022 2.01388 9.44046 2.13618C9.41914 2.15346 9.39021 2.17601 9.37107 2.19286C9.28725 2.26668 9.23548 2.3396 9.16493 2.41618C9.01095 2.57628 8.88368 2.70984 8.74396 2.80613C8.68342 2.84221 8.59474 2.82972 8.5545 2.8273L8.43574 2.91403C7.7586 2.18717 6.83665 1.72246 5.84392 1.63218C5.84114 1.5896 5.8375 1.51262 5.83658 1.48945C5.79594 1.44964 5.74684 1.41566 5.73451 1.32965C5.72093 1.1578 5.7436 0.972899 5.76987 0.749848C5.78436 0.645634 5.80845 0.559062 5.81256 0.445948C5.8135 0.420234 5.812 0.382922 5.8119 0.355119C5.81188 0.159004 5.6721 -1.79184e-05 5.49967 1.51436e-09ZM5.10873 2.47901L5.016 4.15558L5.00933 4.15899C5.00311 4.30898 4.88252 4.42875 4.73447 4.42875C4.67382 4.42875 4.61784 4.40881 4.57235 4.3748L4.56968 4.37616L3.22673 3.40163C3.63948 2.98617 4.16741 2.67915 4.77583 2.53774C4.88697 2.51191 4.99806 2.49274 5.10873 2.47901ZM5.89128 2.47901C6.60162 2.56844 7.25854 2.89769 7.76194 3.40232L6.42766 4.3707L6.42299 4.36865C6.30456 4.4572 6.13771 4.43523 6.04539 4.31675C6.00758 4.26821 5.98774 4.21115 5.98535 4.15353L5.98402 4.15285L5.89128 2.47901ZM2.73972 4.02787L3.96592 5.1506L3.96459 5.15743C4.07527 5.25592 4.09159 5.42683 3.99928 5.54532C3.96147 5.59386 3.91085 5.62642 3.85651 5.64162L3.85518 5.64708L2.2834 6.11147C2.2034 5.36265 2.37581 4.63475 2.73972 4.02787ZM8.25095 4.02855C8.43314 4.33084 8.5711 4.66847 8.65324 5.0345C8.73438 5.39614 8.75475 5.75713 8.72128 6.106L7.1415 5.64025L7.14017 5.63342C6.9987 5.59384 6.91176 5.44654 6.9447 5.29879C6.95819 5.23826 6.98957 5.18706 7.03209 5.14923L7.03142 5.14581L8.25095 4.02855ZM5.24816 5.23733H5.75052L6.06274 5.63684L5.95066 6.13537L5.49967 6.35732L5.04735 6.13469L4.93528 5.63615L5.24816 5.23733ZM6.85863 6.60454C6.87998 6.60343 6.90124 6.6054 6.92201 6.60932L6.92468 6.6059L8.5505 6.88727C8.31256 7.57157 7.85725 8.16439 7.24891 8.56111L6.6178 7.00063L6.6198 6.9979C6.56182 6.86 6.61984 6.6983 6.75323 6.63254C6.78738 6.6157 6.82306 6.60638 6.85863 6.60454ZM4.12804 6.61137C4.25211 6.61315 4.3634 6.7013 4.39222 6.83058C4.40572 6.89111 4.39915 6.95108 4.37688 7.00405L4.38155 7.01019L3.75711 8.55496C3.17329 8.17146 2.70828 7.59725 2.45953 6.89273L4.07133 6.61273L4.074 6.61615C4.09203 6.61275 4.11031 6.61111 4.12804 6.61137ZM5.48967 7.28814C5.53289 7.28652 5.57674 7.29559 5.61842 7.31614C5.67307 7.34308 5.71528 7.38549 5.74185 7.43634H5.74785L6.54241 8.90598C6.43929 8.94137 6.33328 8.97161 6.22485 8.99681C5.61718 9.13805 5.01144 9.09525 4.46294 8.90393L5.2555 7.43702H5.25684C5.30439 7.34601 5.39459 7.29172 5.48967 7.28814Z"
        fill="currentColor"
      />
    </svg>
  ),
  clusterAPI: (props: IconProps) => (
    <svg
      {...props}
      viewBox="0 0 109 89"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50.2597 54.5159C50.2004 55.7711 50.209 57.0285 50.2854 58.2828C50.4882 60.1393 49.5812 61.2959 47.9739 61.6611C42.104 62.9949 36.2978 63.2207 30.825 60.0471C28.6688 58.7968 28.0274 56.8996 28.5996 54.6216C29.348 51.6425 30.2285 48.6943 31.1311 45.7571C31.509 44.5276 32.6029 44.2543 33.733 44.3989C37.1536 44.8363 40.5735 45.2917 43.9759 45.8486C44.5861 45.9141 45.2032 45.8439 45.7831 45.6431C47.9837 45.0981 49.8276 46.2562 50.248 48.4939C50.6228 50.4887 50.4256 52.5061 50.2597 54.5159ZM49.3209 53.9589C49.3209 52.2599 49.2067 50.9957 49.3457 49.7601C49.6001 47.5003 48.7227 46.5819 46.5017 47.1357C45.5327 47.3909 44.5192 47.4278 43.5342 47.2435C40.3363 46.6365 37.142 46.0103 33.9415 45.4174C32.9892 45.241 32.0864 45.1326 31.755 46.4691C31.0631 49.2588 30.3142 52.0341 29.5081 54.795C29.1031 56.1884 29.4478 57.2025 30.5791 58.0854C35.849 62.1985 41.6508 62.6481 47.811 60.6305C49.3409 60.1294 49.6106 58.8533 49.5399 57.4489C49.474 56.1371 49.3763 54.8269 49.3209 53.9589Z"
        fill="currentColor"
      />
      <path
        d="M88.4382 35.9339C88.5759 35.8502 88.7249 35.7868 88.8807 35.7455C90.0493 35.5974 91.0063 35.1727 91.644 34.0824C92.0379 33.4089 92.7857 33.4442 93.448 33.6631C94.6979 34.0763 95.553 34.8705 95.8024 36.2338C96.0376 37.5197 95.4554 38.3697 94.4639 39.0832C93.4397 39.8201 93.3971 40.5915 94.2525 41.5426C95.8562 43.3255 98.8573 43.9772 101.012 42.9047C105.349 40.7464 107.515 36.9932 108.489 32.4273C108.652 31.6371 108.701 30.8277 108.634 30.0237C108.428 27.3085 107.139 25.0896 105.554 22.9957C104.185 21.2181 102.991 19.312 101.991 17.304C100.187 13.6227 97.3423 11.0401 93.2324 10.2214C88.0348 9.18616 83.3266 10.3482 79.3359 13.9051C76.4334 16.4921 74.6422 19.8145 73.4414 23.4699C71.968 27.9552 72.3751 32.2526 74.8134 36.3229C76.3141 38.8282 76.9075 41.4495 76.2823 44.3824C75.7944 46.6713 75.9971 48.9209 77.6289 50.8429C77.8819 51.1616 78.0616 51.5322 78.155 51.9282C78.2485 52.3242 78.2535 52.736 78.1697 53.1342C77.3044 58.5839 74.6375 62.8609 69.7962 65.6054C58.5501 71.9807 46.4011 73.4604 33.762 72.0251C25.4818 71.1346 17.5875 68.0572 10.8893 63.1085C10.5898 62.8168 10.2166 62.612 9.80971 62.5161C9.84772 62.8872 10.0092 63.2348 10.2682 63.5033C13.7197 68.6466 18.1991 73.0193 23.424 76.346C25.1158 77.4162 25.3499 77.9503 24.8668 79.911C23.7989 84.2453 25.9013 87.7216 30.2609 88.6933C32.6247 89.2202 35.0108 89.0044 37.3617 88.5269C39.3523 88.1225 40.0334 87.2901 40.3398 85.251C40.5077 84.1336 40.4476 83.0101 40.544 81.8937C40.7308 79.732 41.8548 78.8373 44.0017 79.1116C44.5232 79.1783 45.0407 79.2751 45.56 79.359C50.0275 80.0806 54.4859 80.2413 58.934 79.1947C60.5274 78.8197 61.0926 79.201 61.4644 80.8292C61.7843 82.23 62.0307 83.6509 62.4206 85.0316C62.7921 86.3469 63.566 87.405 65.0261 87.6296C68.9168 88.2282 72.7293 87.9269 76.3782 86.3723C79.4714 85.0546 80.549 82.4717 79.3104 79.3209C78.5155 77.2988 77.6017 75.3233 76.7394 73.3277C76.5305 72.8441 76.2437 72.3508 76.4926 71.8204C77.0866 70.5544 77.487 69.1866 78.3862 68.077C80.2323 65.7216 81.5293 62.9837 82.1825 60.0631C82.8976 57.1698 83.6479 54.2851 84.4332 51.4092C85.2991 48.216 87.3576 46.3127 90.6526 45.758C91.827 45.5603 92.9798 45.2379 94.1509 45.0168C94.96 44.864 95.1744 44.6166 94.6115 43.8704C93.9166 42.9491 93.3223 41.9501 92.7104 40.9685C91.627 39.2306 90.4261 37.6003 88.7252 36.403C88.6386 36.3591 88.566 36.2919 88.5153 36.2091C88.4646 36.1263 88.4379 36.031 88.4382 35.9339ZM18.3005 56.3241C18.3005 56.4616 18.2725 56.5493 18.3045 56.5948C20.2417 59.3466 21.1083 62.2338 19.4954 65.4684C19.22 66.0208 19.5978 66.3129 20.0758 66.4899C20.5854 66.6785 20.8797 66.4506 21.0357 65.9754C21.1122 65.7422 21.1774 65.5053 21.2569 65.2732C22.3507 62.0824 24.513 60.6946 27.8693 61.0274C28.2531 61.0655 28.6377 61.0971 29.0205 61.1438C34.2101 61.7774 37.6532 65.0565 37.6631 69.7839C37.6639 70.1367 37.6899 70.5648 38.1324 70.6106C38.6322 70.6624 38.5955 70.1888 38.6741 69.8647C39.6346 65.9029 41.7515 63.8671 45.53 63.32C46.6097 63.1756 47.7036 63.1741 48.7836 63.3155C52.0656 63.7087 54.6969 65.0354 55.9181 68.3544C55.9774 68.5153 56.0547 68.6812 56.3093 68.6704C56.6612 68.3139 56.4013 67.8915 56.3831 67.5011C56.2862 65.4345 56.6902 63.5243 58.0784 61.911C61.5994 57.819 66.9382 57.5742 70.77 61.3282C70.8702 61.4264 70.9663 61.5291 71.0704 61.6229C71.2225 61.7601 71.3682 61.9757 71.5987 61.8846C71.8822 61.7724 71.8678 61.4791 71.825 61.2444C71.6977 60.4134 71.5276 59.5895 71.3153 58.776C70.8992 57.3513 70.9444 55.8315 71.4446 54.4341C71.7797 53.4735 72.1902 52.5408 72.6721 51.6448C72.797 51.4077 73.0575 51.1579 72.8749 50.876C72.6925 50.5944 72.3666 50.7328 72.096 50.752C70.1627 50.8893 69.5324 50.5409 68.6995 48.7962C67.8074 46.9275 67.1023 44.9808 66.3289 43.062C65.1827 40.218 65.1703 37.6642 67.8425 35.6078C68.5253 35.0824 68.5771 34.3963 68.1573 33.6381C67.6819 32.7795 67.2779 31.8812 66.7989 31.0247C64.4301 26.7893 61.6085 22.9389 57.5085 20.1843C56.2018 19.3063 55.5634 19.2355 54.4699 20.1482C50.083 23.8101 42.8289 23.541 38.1909 20.8037C37.5138 20.4216 36.9862 19.8212 36.6941 19.1006C36.3177 18.1819 35.9129 18.076 35.0996 18.602C34.2744 19.1357 34.2018 19.5292 34.8408 20.2938C36.3543 22.1046 38.3304 23.1684 40.5505 23.8764C42.2796 24.4278 42.8357 25.1383 42.6484 26.6711C42.0374 31.3013 40.8017 35.8274 38.975 40.1256C38.189 42.0305 36.6613 42.7955 34.6423 42.5562C28.693 41.8511 23.2868 39.9951 19.3245 35.1676C18.9296 34.6866 18.5757 34.7503 18.1756 35.1199C17.5407 35.7064 17.5838 36.2943 18.3095 37.1318C19.918 38.9881 22.1472 39.8066 24.3326 40.6527C26.7539 41.5901 27.9618 43.3659 28.3773 45.8432C28.9471 49.2407 27.9531 52.3036 26.4139 55.2412C25.1932 57.5711 24.2877 57.932 21.7155 57.2725C21.1048 57.1159 20.508 56.9057 19.9023 56.7291C19.3936 56.5089 18.8527 56.3721 18.3005 56.3241ZM33.9938 40.745C36.5096 40.726 37.7431 39.9764 38.2101 38.2425C39.1665 34.6918 40.0296 31.1162 40.9659 27.56C41.2303 26.5558 40.8751 25.9425 39.9872 25.5335C38.7147 24.9475 37.4379 24.37 36.1791 23.7555C34.9842 23.2241 33.9955 22.3168 33.3635 21.1718C32.5117 19.5572 32.0706 19.4352 30.5138 20.4768C26.2497 23.2778 22.6755 27.0084 20.0596 31.3884C19.3094 32.6531 19.3415 33.3718 20.3451 34.4109C24.19 38.3915 29.0936 40.0492 33.9938 40.745ZM27.0204 45.268C27.0594 44.1467 26.0585 43.6276 25.0639 43.1854C22.6621 42.1183 20.388 40.7841 18.2847 39.2082C16.8438 38.13 16.4384 38.2618 15.8998 40.0372C15.0258 42.9179 14.2259 45.821 13.3666 48.7063C13.2533 49.0555 13.236 49.4286 13.3164 49.7868C13.3969 50.1449 13.5723 50.4748 13.8241 50.7418C15.557 52.8651 17.836 54.2034 20.2845 55.3007C23.4957 56.7397 24.1446 56.4759 25.5772 53.2163C26.6578 50.7573 26.6791 48.1046 27.0204 45.268ZM28.0077 62.618C25.5102 62.6209 24.0818 63.2647 23.1879 64.7951C22.1756 66.5281 22.5532 67.6351 24.4232 68.2972C27.6735 69.4481 31.0551 70.0717 34.4277 70.7202C35.3426 70.8961 35.8215 70.4892 35.9071 69.5505C36.0392 68.4605 35.787 67.3585 35.194 66.4344C33.4947 63.8452 31.0673 62.6371 28.0077 62.618ZM11.7696 54.681C9.27363 54.6883 8.10197 56.3512 8.88168 58.4968C9.13273 59.1521 9.48625 59.7634 9.92903 60.3079C11.4743 62.2829 13.6793 63.3129 15.8448 64.3758C17.5813 65.2282 18.8167 64.4883 18.9907 62.5593C19.0323 62.1764 19.0061 61.7891 18.9131 61.4153C17.9929 58.089 15.8327 55.9283 12.6002 54.8102C12.3292 54.7356 12.0505 54.6922 11.7696 54.681ZM57.6553 66.7471C57.6188 68.0903 57.8624 68.3252 59.1754 68.0571C62.7189 67.3557 66.1136 66.0442 69.2082 64.1811C70.3502 63.4881 70.402 63.0865 69.4586 62.1894C67.8544 60.6641 65.8769 60.3875 63.7901 60.5949C60.4778 60.9241 57.7382 63.6925 57.6553 66.7471ZM43.6472 70.8567L43.6527 70.9092C45.8831 70.7307 48.1141 70.5596 50.3435 70.3694C51.0399 70.3101 51.7359 70.2231 52.4252 70.1075C54.0935 69.8276 54.3207 69.2587 53.3423 67.8738C51.2254 64.8777 46.2909 64.03 43.0225 66.1036C41.8707 66.796 40.9979 67.8701 40.5559 69.1392C40.1765 70.251 40.5943 70.8284 41.7578 70.8542C42.3873 70.8681 43.0174 70.8567 43.6472 70.8567ZM45.0957 21.1308C46.8316 21.1795 48.5648 20.965 50.2365 20.4945C51.2641 20.258 52.2275 19.7991 53.0588 19.1502C53.7493 18.5711 53.6779 18.0685 52.8524 17.7664C48.4952 16.172 44.0776 16.3715 39.6396 17.3628C39.4029 17.4267 39.173 17.5136 38.9531 17.6221C37.9855 18.0502 37.9306 18.3252 38.62 19.1704C39.2469 19.8876 40.0805 20.393 41.0063 20.6171C42.3313 21.0149 43.7134 21.1886 45.0957 21.1308ZM73.9485 47.7314C73.9424 47.2928 73.8159 46.8644 73.5827 46.4929C72.4314 44.2849 71.4025 42.0152 70.5008 39.6941C70.2383 39.0063 69.9906 38.3121 69.7028 37.635C69.5452 37.2641 69.3063 36.9779 68.8081 37.1343C67.7586 37.4637 66.7981 39.0896 67.067 40.1576C67.435 41.6195 67.8115 43.0795 68.2109 44.533C68.6177 46.2147 69.4964 47.7453 70.7437 48.9444C71.1731 49.3414 71.6475 49.7774 72.2177 49.4231C72.939 48.975 73.7475 48.5408 73.9485 47.7314ZM45.9175 15.2202C48.1506 15.3914 50.3662 15.7427 52.5428 16.2705C52.9435 16.3664 53.4496 16.6262 53.6221 16.0551C53.8997 15.1364 53.5051 14.2462 53.1918 13.4141C52.976 12.8408 52.3271 13.1498 51.8597 13.1676C50.844 13.2303 49.8247 13.1998 48.8145 13.0767C47.1491 12.8352 45.4858 12.5695 43.8137 12.3859C42.1469 12.2029 41.6878 12.6812 41.6327 14.367C41.6056 15.1952 41.9461 15.5353 42.7534 15.4677C43.7661 15.3828 44.7798 15.3087 45.9175 15.2202ZM76.502 52.9849C76.4762 52.6128 76.4267 52.2428 76.3536 51.877C76.1259 50.9187 75.7219 50.8046 74.9942 51.5029C74.1155 52.3094 73.4042 53.281 72.9008 54.3622C72.299 55.7204 72.2163 57.2522 72.6686 58.6673C72.9742 59.6925 73.5817 59.8417 74.2148 59.0714C75.6696 57.3748 76.4795 55.2196 76.502 52.9849Z"
        fill="currentColor"
      />
      <path
        d="M94.4941 24.9924C94.5036 23.7268 94.7644 22.6776 95.7778 22.7304C96.7983 22.7837 97.193 23.8418 97.1772 24.8535C97.1617 25.8477 96.8807 26.9312 95.7153 26.8508C94.557 26.771 94.4741 25.6484 94.4941 24.9924Z"
        fill="#currentColor"
      />
      <path
        d="M49.0917 42.8919C47.4551 43.1193 45.7878 42.9523 44.2287 42.4051C42.3814 41.7777 41.6516 40.6556 41.956 38.8385C42.5668 35.1926 43.1897 31.5484 43.8472 27.9107C44.3242 25.2719 44.7582 24.9882 47.3416 24.6147C50.2893 24.1886 53.4136 24.2078 55.7263 21.8215C56.1675 21.3662 56.6405 21.5826 57.0837 21.8847C57.8094 22.3794 58.7006 22.7335 59.2401 23.3816C61.7112 26.3505 64.3165 29.2448 65.4683 33.0792C65.6288 33.5164 65.6749 33.9873 65.6025 34.4473C65.53 34.9074 65.3413 35.3413 65.0543 35.7081C61.7979 40.2082 57.1397 42.0515 51.8667 42.7445C51.1227 42.8423 50.364 42.8282 49.0917 42.8919ZM42.9926 38.8773C42.4509 40.4198 43.8428 41.2742 45.8875 41.5821C51.5842 42.4401 56.6572 40.6176 61.5269 37.9186C64.1865 36.4445 64.9506 34.2651 63.6424 31.5207C62.2952 28.8201 60.5155 26.358 58.3738 24.2318C57.7061 23.5429 56.8729 22.8564 55.7407 23.6099C53.269 25.2722 50.3118 26.0592 47.3408 25.8453C46.0626 25.7661 45.6102 26.3347 45.2972 27.4683C44.293 31.1043 43.7114 34.8168 42.9926 38.8773Z"
        fill="#326CE5"
      />
      <path
        d="M51.8511 52.4544C51.8511 50.7589 51.8262 49.0629 51.8597 47.368C51.8829 46.1901 52.4675 45.1914 53.5526 44.8623C56.0067 44.118 57.9919 42.5355 60.2262 41.4081C62.3359 40.3435 64.0704 40.7142 65.211 42.7827C66.5416 45.1954 67.9442 47.5886 68.7687 50.2558C69.7085 53.2958 68.9897 55.0872 66.2114 56.7031C64.1202 57.9194 61.8242 58.5734 59.5474 59.2802C58.1002 59.6998 56.6773 60.1993 55.2854 60.7765C53.4158 61.5922 52.4673 61.0067 52.0668 59.0346C51.6236 56.8523 51.7574 54.652 51.8511 52.4544ZM53.1444 52.715C53.2112 54.8354 52.7732 56.9728 53.2782 59.0902C53.5166 60.0898 53.8626 60.281 54.83 59.8188C56.0381 59.2999 57.2757 58.8529 58.5365 58.4799C61.4975 57.4757 64.5864 56.831 67.2027 54.9257C68.3595 54.0833 68.6218 53.2907 68.2082 51.922C67.1965 48.5749 65.0959 45.7643 63.7962 42.5651C63.3992 41.5878 62.4739 41.9674 61.8204 42.2212C60.5968 42.713 59.402 43.2737 58.2417 43.9004C56.5258 44.8018 54.1382 45.3713 53.3363 46.8077C52.4831 48.3362 53.1444 50.7102 53.1444 52.715Z"
        fill="#326CE5"
      />
      <path
        d="M83.3503 49.3485L83.3503 49.3503L76.1776 18.1956C75.9847 17.3896 75.6153 16.6365 75.0961 15.9906C74.577 15.3447 73.9209 14.8221 73.1752 14.4605L44.1424 0.59889C43.39 0.239817 42.5668 0.0534668 41.733 0.0534668C40.8993 0.0534668 40.0761 0.239817 39.3236 0.59889L10.2971 14.4678C9.55126 14.8292 8.89495 15.3517 8.37558 15.9976C7.85622 16.6435 7.48677 17.3967 7.29391 18.2028L0.132923 49.3565C-0.0436987 50.1438 -0.0443128 50.9604 0.131124 51.748C0.182895 51.988 0.250517 52.2244 0.333547 52.4555C0.473606 52.8498 0.659064 53.2265 0.886177 53.5779C0.984718 53.7283 1.0886 53.8744 1.20147 54.0158L21.2935 78.9965C21.3813 79.1049 21.478 79.2044 21.5739 79.3056C21.8891 79.6412 22.2451 79.936 22.6335 80.1834C23.1248 80.4927 23.6603 80.7255 24.2215 80.8739C24.6816 80.9999 25.1561 81.0653 25.6331 81.0683H25.9457L57.8537 81.0611C58.0476 81.0603 58.2413 81.049 58.4341 81.0271C58.7105 80.9958 58.9841 80.9437 59.2527 80.8712C59.4453 80.8206 59.6352 80.7599 59.8215 80.6894C59.9666 80.6339 60.1116 80.5784 60.2514 80.5112C60.4611 80.4108 60.6645 80.2977 60.8605 80.1726C61.3661 79.8547 61.8163 79.4563 62.1932 78.993L62.8059 78.2317L82.2782 54.0078C82.6514 53.5397 82.9447 53.0131 83.1461 52.4493C83.2302 52.2176 83.299 51.9807 83.3521 51.74C83.5279 50.9524 83.5273 50.1357 83.3503 49.3485ZM41.3792 10.7153C41.5875 10.6569 41.8071 10.651 42.0182 10.6982C41.8051 10.7035 41.5912 10.7056 41.3792 10.7153Z"
        fill="#326CE5"
      />
      <path
        d="M69.6122 45.6205C69.4668 45.5872 69.26 45.5303 69.1181 45.504C68.578 45.4293 68.034 45.3855 67.4889 45.3727C66.4593 45.3053 65.4387 45.1378 64.4415 44.8725C64.1337 44.6992 63.8799 44.4439 63.7084 44.135L63.0225 43.9353C63.7559 38.5765 62.4967 33.135 59.4838 28.6432C59.659 28.4838 59.9918 28.1895 60.0855 28.1028C60.062 27.7526 60.1764 27.407 60.4043 27.1401C61.1871 26.4677 62.0334 25.8731 62.9314 25.3646C63.4176 25.1176 63.889 24.8427 64.3434 24.5412C64.4529 24.4598 64.6027 24.331 64.7174 24.2391C64.9198 24.1106 65.0929 23.941 65.2255 23.7412C65.358 23.5415 65.447 23.3161 65.4867 23.0797C65.5264 22.8433 65.5159 22.6012 65.4558 22.3691C65.3958 22.137 65.2876 21.9202 65.1382 21.7327C64.9889 21.5452 64.8017 21.3912 64.5889 21.2808C64.3762 21.1704 64.1425 21.106 63.9032 21.0918C63.6639 21.0776 63.4243 21.114 63.2 21.1985C62.9757 21.283 62.7717 21.4138 62.6012 21.5823C62.4856 21.6734 62.3279 21.7934 62.2246 21.8828C61.8276 22.2566 61.4527 22.6532 61.1016 23.0705C60.4071 23.834 59.64 24.5281 58.8111 25.143C58.4846 25.2758 58.1275 25.3147 57.7801 25.2551L57.1337 25.7167C53.4128 21.812 48.401 19.3904 43.0294 18.902C43.0137 18.676 42.9944 18.2669 42.9883 18.1434C42.6997 17.9434 42.5007 17.6385 42.4338 17.2938C42.398 16.2625 42.4625 15.2302 42.6265 14.2114C42.7346 13.6779 42.8118 13.1386 42.8577 12.5962C42.863 12.4595 42.8551 12.2607 42.8551 12.1126C42.8792 11.875 42.8531 11.6349 42.7786 11.4079C42.7041 11.181 42.5828 10.9722 42.4225 10.795C42.2623 10.6178 42.0667 10.4762 41.8483 10.3794C41.63 10.2825 41.3937 10.2325 41.1548 10.2327C40.916 10.2328 40.6798 10.283 40.4615 10.3801C40.2432 10.4772 40.0478 10.619 39.8877 10.7963C39.7277 10.9737 39.6066 11.1826 39.5323 11.4096C39.458 11.6367 39.4322 11.8768 39.4565 12.1144C39.4565 12.1302 39.46 12.1459 39.4609 12.1617C39.4591 12.3027 39.4521 12.4735 39.4565 12.597C39.503 13.1397 39.5805 13.6793 39.6886 14.2131C39.8516 15.2317 39.9149 16.2638 39.8778 17.2946C39.7813 17.6341 39.5899 17.9389 39.326 18.1732L39.2857 18.8924C38.252 18.9777 37.2255 19.1354 36.2138 19.3645C31.9638 20.3249 28.0978 22.5336 25.1122 25.7071C24.9055 25.5646 24.7008 25.4195 24.4982 25.2718C24.1619 25.3723 23.7997 25.337 23.4891 25.1737C22.6601 24.5599 21.8929 23.8666 21.1986 23.1038C20.8488 22.6868 20.4753 22.2902 20.08 21.9161C19.9766 21.8276 19.8181 21.7067 19.7025 21.6147C19.3656 21.3431 18.9505 21.1866 18.5182 21.168C18.2613 21.1545 18.0047 21.2016 17.7695 21.3057C17.5342 21.4098 17.3268 21.5679 17.164 21.7672C16.8885 22.1552 16.7778 22.6365 16.8561 23.1059C16.9344 23.5754 17.1953 23.9947 17.5818 24.2723L17.6081 24.2907C17.7193 24.3818 17.856 24.4983 17.9593 24.5737C18.4126 24.8752 18.8829 25.1504 19.3678 25.3979C20.266 25.9063 21.1124 26.5013 21.8949 27.1743C22.0981 27.4627 22.2165 27.8022 22.2365 28.1545L22.7805 28.6406C19.7759 33.1486 18.5413 38.6072 19.3135 43.9694L18.6023 44.1761C18.4166 44.4727 18.167 44.7241 17.8718 44.9119C16.8753 45.1779 15.8553 45.346 14.8261 45.4138C14.2807 45.4263 13.7364 45.4701 13.196 45.5452C13.0655 45.5688 12.8842 45.6153 12.7423 45.6503L12.7274 45.6538L12.7029 45.6608C12.4675 45.6918 12.2413 45.7715 12.0385 45.8949C11.8358 46.0184 11.661 46.1828 11.5254 46.3776C11.3899 46.5725 11.2965 46.7935 11.2512 47.0265C11.2059 47.2595 11.2098 47.4994 11.2626 47.7308C11.3154 47.9623 11.4159 48.1801 11.5577 48.3705C11.6995 48.5609 11.8795 48.7195 12.0861 48.8363C12.2928 48.9531 12.5215 49.0255 12.7577 49.0488C12.9939 49.0722 13.2324 49.0459 13.4579 48.9718L13.4834 48.9683C13.4948 48.9657 13.5044 48.9596 13.5158 48.9578C13.6559 48.9263 13.832 48.8921 13.9555 48.8588C14.4742 48.6932 14.9831 48.4981 15.4796 48.2746C16.4365 47.8887 17.4286 47.5968 18.442 47.403C18.7934 47.4246 19.1318 47.5441 19.4187 47.7481L20.1597 47.6211C21.8226 52.7589 25.3081 57.1106 29.9587 59.8553L29.6495 60.5963C29.7933 60.8948 29.846 61.229 29.8011 61.5572C29.3775 62.5253 28.8624 63.4507 28.2629 64.3208C27.9334 64.7555 27.6292 65.2088 27.352 65.6785C27.2845 65.8064 27.1987 66.0026 27.1339 66.1366C27.0112 66.3408 26.9326 66.5683 26.9032 66.8047C26.8738 67.041 26.8942 67.2809 26.963 67.5089C27.0319 67.7369 27.1477 67.9479 27.3031 68.1285C27.4584 68.309 27.6498 68.455 27.865 68.5571C28.0802 68.6592 28.3144 68.7151 28.5524 68.7212C28.7905 68.7274 29.0273 68.6836 29.2474 68.5927C29.4676 68.5019 29.6663 68.3659 29.8307 68.1936C29.9951 68.0214 30.1217 67.8166 30.2022 67.5924L30.2049 67.5889V67.5854C30.2697 67.4522 30.3608 67.2779 30.415 67.1535C30.6086 66.6444 30.7724 66.1243 30.9056 65.5961C31.1989 64.522 31.6418 63.4944 32.2212 62.5435C32.4238 62.3534 32.679 62.2288 32.9535 62.1861L33.3389 61.4897C38.3832 63.4293 43.965 63.4433 49.019 61.5291C49.1267 61.7219 49.3282 62.0897 49.3816 62.1826C49.7285 62.2381 50.0398 62.4274 50.2488 62.7099C50.7298 63.622 51.1206 64.579 51.4155 65.5672C51.5499 66.0953 51.7145 66.6153 51.9086 67.1246C51.9638 67.2498 52.0541 67.4268 52.1189 67.5599C52.1991 67.7843 52.3254 67.9895 52.4897 68.1621C52.654 68.3348 52.8526 68.4711 53.0728 68.5624C53.2929 68.6536 53.5298 68.6978 53.768 68.692C54.0063 68.6862 54.2407 68.6306 54.4561 68.5287C54.6716 68.4268 54.8633 68.281 55.019 68.1005C55.1747 67.9201 55.2909 67.7091 55.3601 67.481C55.4293 67.2529 55.45 67.0129 55.4208 66.7764C55.3917 66.5398 55.3133 66.312 55.1908 66.1076C55.1259 65.9736 55.0366 65.7774 54.9692 65.6504C54.6919 65.1818 54.3877 64.7297 54.0582 64.2962C53.4694 63.4481 52.9648 62.5446 52.5517 61.5984C52.4621 61.2602 52.509 60.9003 52.6822 60.5964C52.5734 60.374 52.4789 60.1449 52.3993 59.9105C57.065 57.1437 60.551 52.7584 62.1939 47.5888C62.4138 47.6238 62.7965 47.6904 62.9209 47.7158C63.1795 47.4785 63.5205 47.3518 63.8713 47.3628C64.885 47.5564 65.8775 47.8483 66.8346 48.2343C67.3311 48.4598 67.8403 48.6563 68.3596 48.823C68.4822 48.8554 68.6574 48.886 68.7984 48.9167C68.8098 48.9202 68.8203 48.9254 68.8317 48.9281L68.8562 48.9316C69.0817 49.0056 69.3201 49.0317 69.5562 49.0084C69.7923 48.985 70.021 48.9126 70.2275 48.7958C70.4341 48.679 70.614 48.5205 70.7558 48.3302C70.8975 48.1399 70.998 47.9222 71.0508 47.6908C71.1037 47.4595 71.1076 47.2197 71.0625 46.9868C71.0173 46.7538 70.9241 46.5329 70.7887 46.338C70.6533 46.1432 70.4787 45.9787 70.2761 45.8552C70.0735 45.7316 69.8474 45.6517 69.6122 45.6205ZM53.467 28.3139L46.2055 33.4617L46.1801 33.4503C45.9612 33.61 45.7031 33.7073 45.4334 33.732C45.1636 33.7566 44.8922 33.7077 44.648 33.5905C44.4037 33.4732 44.1959 33.292 44.0464 33.066C43.897 32.8401 43.8116 32.5779 43.7993 32.3072L43.7914 32.3038L43.2869 23.4043C47.1265 23.881 50.7033 25.606 53.467 28.3139ZM39.7876 38.0682H42.5205L44.2198 40.1924L43.6101 42.8421L41.1558 44.0228L38.6944 42.8394L38.0838 40.1889L39.7876 38.0682ZM37.2158 23.7161C37.8145 23.5813 38.4197 23.4772 39.029 23.4042L38.5236 32.3169L38.4868 32.3344C38.4754 32.6051 38.3908 32.8676 38.242 33.094C38.0932 33.3203 37.8857 33.5021 37.6418 33.62C37.3979 33.7378 37.1265 33.7873 36.8567 33.7631C36.5869 33.7389 36.3287 33.642 36.1095 33.4827L36.0955 33.4906L28.7868 28.3086C31.1135 26.0221 34.033 24.4315 37.2158 23.7161ZM26.1362 31.6398L32.809 37.6075L32.802 37.6443C33.0064 37.8223 33.1587 38.0524 33.2426 38.3101C33.3265 38.5678 33.3389 38.8435 33.2785 39.1077C33.2181 39.3719 33.0871 39.6148 32.8995 39.8104C32.712 40.0061 32.4748 40.1472 32.2134 40.2186L32.2064 40.2476L23.6529 42.7159C23.2266 38.8505 24.1004 34.9532 26.1362 31.6398ZM35.0707 47.4942L31.6721 55.706C28.4102 53.618 25.9286 50.5119 24.612 46.8696L33.3819 45.3806L33.3968 45.3998C33.4937 45.3812 33.5923 45.3724 33.6911 45.3736C33.937 45.3773 34.1781 45.4415 34.3933 45.5605C34.6085 45.6796 34.7911 45.8497 34.925 46.056C35.0588 46.2623 35.1398 46.4984 35.1608 46.7435C35.1817 46.9885 35.1421 47.2349 35.0453 47.4609L35.0707 47.4942ZM45.1019 58.0553C41.9221 58.7843 38.6021 58.6135 35.5139 57.5621L39.827 49.7628H39.834C39.9622 49.5244 40.1525 49.3252 40.3848 49.1862C40.617 49.0473 40.8826 48.9737 41.1532 48.9735C41.4239 48.9732 41.6896 49.0462 41.9221 49.1847C42.1547 49.3232 42.3454 49.5221 42.4741 49.7602H42.5065L46.8301 57.5726C46.2689 57.7601 45.6928 57.921 45.1019 58.0553ZM50.6745 55.7393L47.2408 47.4433L47.2513 47.4285C47.099 47.0735 47.0895 46.6735 47.2248 46.3118C47.36 45.95 47.6297 45.6544 47.9775 45.4865C48.1568 45.3988 48.3519 45.3481 48.5513 45.3376C48.6666 45.3323 48.7822 45.3408 48.8955 45.363L48.9104 45.3446L57.7582 46.8399C56.452 50.5114 53.9595 53.6429 50.6745 55.7393ZM58.6875 42.687L50.0912 40.2108L50.0833 40.1749C49.8221 40.1029 49.5853 39.9615 49.3981 39.7657C49.2108 39.5699 49.0801 39.327 49.0198 39.0629C48.9596 38.7988 48.972 38.5232 49.0557 38.2656C49.1395 38.008 49.2915 37.7778 49.4955 37.5996L49.492 37.5821L56.1281 31.6433C58.1602 34.948 59.0587 38.8254 58.6875 42.687Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_107_60"
          x1="8.64276"
          y1="49.4291"
          x2="108.661"
          y2="49.4291"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#326DE6" />
          <stop offset="1" stop-color="#10FFC6" />
        </linearGradient>
      </defs>
    </svg>
  ),
};
