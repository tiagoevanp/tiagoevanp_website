export const FlexBoxGridExample = () => {
    const style = {
        container: {
            display: 'grid',
            gridTemplateAreas:
            '\'header header header header\' \'main main . sidebar\' \'footer footer footer footer\'',
            // minmax(0, 1fr) and the clamps below let the example shrink to narrow screens
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gridTemplateRows: 'auto',
            gap: '8px',
            width: '100%',
            height: '400px',
            marginBlock: '16px',
            padding: 'clamp(8px, 4vw, 32px)',
            borderRadius: 'var(--radius-md)',
            border: 'var(--hairline-width) solid var(--line)',
            color: 'var(--swatch-text)',
            fontSize: 'clamp(14px, 4vw, 24px)',
        },
        header: {
            gridArea: 'header',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100px',
            margin: 'auto',
            backgroundColor: 'var(--swatch-primary)',
            boxShadow: 'var(--shadow-sm)',
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
            backgroundColor: 'var(--swatch-secondary)',
            boxShadow: 'var(--shadow-sm)',
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
            backgroundColor: 'var(--swatch-highlight)',
            boxShadow: 'var(--shadow-sm)',
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
            backgroundColor: 'var(--swatch-neutral)',
            boxShadow: 'var(--shadow-sm)',
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
