export const FlexBoxGridExample = () => {
    const style = {
        container: {
            display: 'grid',
            gridTemplateAreas:
            '\'header header header header\' \'main main . sidebar\' \'footer footer footer footer\'',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gridTemplateRows: 'auto',
            gap: '8px',
            width: '100%',
            height: '400px',
            marginBlock: '16px',
            padding: '32px',
            borderRadius: '4px',
            border: '2px solid var(--gray)',
            color: 'var(--text)',
            fontSize: '24px',
        },
        header: {
            gridArea: 'header',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100px',
            margin: 'auto',
            backgroundColor: 'var(--red)',
            boxShadow: '2px 2px 4px black',
            borderRadius: '8px',
        },
        main: {
            gridArea: 'main',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100px',
            margin: 'auto',
            backgroundColor: 'var(--green-blue)',
            boxShadow: '2px 2px 4px black',
            borderRadius: '8px',
        },
        sidebar: {
            gridArea: 'sidebar',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100px',
            margin: 'auto',
            backgroundColor: 'var(--yellow)',
            boxShadow: '2px 2px 4px black',
            borderRadius: '8px',
        },
        footer: {
            gridArea: 'footer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100px',
            margin: 'auto',
            backgroundColor: 'var(--gray)',
            boxShadow: '2px 2px 4px black',
            borderRadius: '8px',
        },
    };

    return <div className="color-examples" style={style.container}>
        <header style={style.header}>Header</header>
        <main style={style.main}>Content</main>
        <nav style={style.sidebar}>
            Sidebar
        </nav>
        <footer style={style.footer}>Footer</footer>
    </div>;
};
