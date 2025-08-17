import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => {

  return (
    <Link href="/">
      <Image
        src="/"
        alt="ESSENTIALNG"
        width={160}
        height={50}
        style={{ width: 'auto', height: 'auto' }}
        quality={100}
        className='dark:hidden'
      />
      <Image
        src="/"
        alt="ESSENTIALNG"
        width={160}
        height={50}
        style={{ width: 'auto', height: 'auto', color:'none'}}
        quality={100}
        className='dark:block hidden'
      />

    </Link>
  );
};

export default Logo;
