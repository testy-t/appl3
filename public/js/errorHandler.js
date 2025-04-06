/**
 * Error handler and badge for test_coder app
 * This script:
 * 1. Captures runtime errors and displays a custom error screen (only in iframe)
 * 2. Shows a Poehali! badge in the bottom right corner (only in production iframe)
 */

(function () {
    // Check if we're in an iframe
    const isInIframe = window.self !== window.top;
    
    // Function to determine if we're in production environment
    // Using Vite's built-in environment variables
    const isProduction = () => {
        // In normal script tags, we need a different approach since import.meta is not available
        // We can check if certain dev-only features exist
        if (typeof window.__VUE_HMR_RUNTIME__ !== 'undefined' ||
            typeof window.HMR_RUNTIME !== 'undefined' ||
            typeof window.__vite_plugin_react_preamble_installed__ !== 'undefined') {
            return false; // Dev environment with hot module replacement
        }

        // Another way is to check for the absence of dev tools
        if (window.location.port === '5173' || // Default Vite dev port
            window.location.port === '3000' ||  // Common dev port
            window.location.port === '8080') {  // Another common dev port
            return false;
        }

        return true; // Default to production if no dev indicators found
    };

    // Storage for badge visibility state
    let badgeHidden = false;

    // Try to load badge state from localStorage
    try {
        badgeHidden = localStorage.getItem('poehali-badge-hidden') === 'true';
    } catch (e) {
        // Ignore localStorage errors
    }

    // Create the Poehali! badge (only in production and if not hidden)
    function createPoehaliiBadge() {
        // Skip if not in production or badge is hidden
        if (!isProduction() || badgeHidden) {
            return null;
        }

        const badge = document.createElement('div');
        badge.id = 'poehali-badge';
        badge.style.position = 'fixed';
        badge.style.bottom = '20px';
        badge.style.right = '20px';
        badge.style.backgroundColor = '#FBB040';
        badge.style.border = 'none';
        badge.style.color = 'black';
        badge.style.padding = '10px 14px';
        badge.style.borderRadius = '0.85rem';
        badge.style.fontSize = '16px';
        badge.style.fontWeight = 'bold';
        badge.style.fontFamily = 'monospace';
        badge.style.display = 'flex';
        badge.style.alignItems = 'center';
        badge.style.gap = '8px';
        badge.style.zIndex = '999999';
        badge.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        badge.style.transition = 'all 0.3s ease';
        badge.style.cursor = 'pointer';

        // Make the badge clickable
        badge.onclick = function() {
            window.open('https://poehali.dev?utm_source=ref&utm_medium=badge', '_blank');
        };

        // Add logo
        const logo = document.createElement('img');
        logo.src = 'https://cdn.poehali.dev/intertnal/brand/logo-b.svg';
        logo.style.height = '22px';
        logo.style.width = 'auto';
        logo.alt = 'Poehali logo';
        logo.style.display = 'block';

        // Add text
        const text = document.createElement('span');
        text.textContent = 'Poehali.dev';

        badge.appendChild(logo);
        badge.appendChild(text);

        // Append to document
        document.body.appendChild(badge);

        // Add hover effect
        badge.onmouseover = function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 15px rgba(251, 176, 64, 0.6)';
        };
        
        badge.onmouseout = function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        };

        return badge;
    }

    // Create the badge when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createPoehaliiBadge);
    } else {
        createPoehaliiBadge();
    }

    // Function to hide the badge - can be called via API
    window.hidePoehaliiBadge = function(permanently = false) {
        const badge = document.getElementById('poehali-badge');
        if (badge) {
            badge.style.display = 'none';
        }
        
        badgeHidden = true;
        
        // Optionally store this preference
        if (permanently) {
            try {
                localStorage.setItem('poehali-badge-hidden', 'true');
            } catch (e) {
                // Ignore localStorage errors
            }
        }
    };
    
    // If we're not in an iframe, don't set up the error handler
    // But still keep the badge
    if (!isInIframe) {
        console.log("Error handler not initialized: page is not in an iframe");
        return;
    }
    
    // Save original console methods
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    // Create storage for the last error
    let lastError = null;

    // Create a rolling error buffer to capture all recent error messages
    const errorBuffer = [];
    const MAX_BUFFER_SIZE = 10; // Keep the last 10 error messages

    // Debug logger function - disabled in production
    function debugLog(message, data) {
        // Debug logs are now disabled
        return;
    }

    console.error = function (...args) {
        // Debug log the incoming error
        debugLog('Received error:', args);

        // Always let the original console.error run
        originalConsoleError.apply(console, args);

        const errorText = args.join(' ');
        debugLog('Processed error text:', errorText);

        // Add to our rolling buffer
        errorBuffer.push(errorText);
        if (errorBuffer.length > MAX_BUFFER_SIZE) {
            errorBuffer.shift(); // Remove oldest item
        }

        debugLog('Current error buffer size:', errorBuffer.length);

        // Special case for import resolution error since that's what we're debugging
        if (errorText.includes('Failed to resolve import')) {
            debugLog('Found import resolution error!');
            const fullErrorMessage = errorBuffer.join('\n\n');
            lastError = fullErrorMessage;
            debugLog('Showing import resolution error screen', fullErrorMessage);
            showErrorScreen(fullErrorMessage);
        }
            // For Vite errors, we want to show a comprehensive error that includes
        // both the error details and the header
        else if (errorText.includes('[vite] Internal Server Error')) {
            debugLog('Found Vite error!');
            // Create a combined error message from buffer contents
            const fullErrorMessage = errorBuffer.join('\n\n');
            lastError = fullErrorMessage;
            debugLog('Showing Vite error screen', fullErrorMessage);
            showErrorScreen(fullErrorMessage);
        }
        // For normal errors that aren't Vite headers
        else if (!errorText.includes('at ') && !errorText.includes('    at ')) {
            // If it's not just a stack trace line, treat as a regular error
            debugLog('Found regular error, not a stack trace line');
            lastError = errorText;
            showErrorScreen(errorText);
        } else {
            debugLog('Ignoring stack trace line');
        }
    };

    console.warn = function (...args) {
        originalConsoleWarn.apply(console, args);
    };

    // Handle uncaught errors
    window.addEventListener('error', function (event) {
        debugLog('Caught error event:', event);

        // Prevent default only for non-network errors
        // This helps avoid showing "Unknown error occurred" for network errors
        // which are usually followed by more detailed Vite errors
        if (!(event.target instanceof HTMLScriptElement ||
            event.target instanceof HTMLLinkElement ||
            event.target instanceof HTMLImageElement)) {
            event.preventDefault();
        }

        // For HTTP errors (like 500s from Vite), don't show an error screen yet
        // because we'll likely get a more detailed error from Vite soon
        if (event.target instanceof HTMLScriptElement &&
            event.target.src && event.target.src.includes('vite')) {
            debugLog('Ignoring initial script error from Vite, waiting for detailed error');
            return true;
        }

        if (event.error && event.error.stack) {
            debugLog('Error has stack trace:', event.error.stack);
            lastError = event.error.stack;
        } else {
            lastError = event.message || 'Unknown error occurred';
            debugLog('Error message from event:', lastError);
        }

        // If we have a generic error message, check if we should wait for a more detailed error
        if (lastError === 'Unknown error occurred' || lastError === 'Script error.') {
            debugLog('Generic error message detected, not showing error screen immediately');
            return true;
        }

        // Check if it might be a Vite-related error
        if (event.filename && event.filename.includes('vite')) {
            debugLog('Error from Vite-related file:', event.filename);

            // Include buffer context for Vite errors
            if (errorBuffer.length > 0) {
                const fullErrorMessage = errorBuffer.join('\n\n') + '\n\n' + lastError;
                lastError = fullErrorMessage;
                debugLog('Enhanced error with buffer contents:', lastError);
            }
        }

        showErrorScreen(lastError);
        return true;
    }, true);

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function (event) {
        debugLog('Caught unhandledrejection event:', event);

        // Don't preventDefault for promise rejections to allow for proper handling

        if (event.reason && event.reason.stack) {
            debugLog('Rejection has stack trace:', event.reason.stack);
            lastError = event.reason.stack;
        } else {
            lastError = event.reason?.message || event.reason || 'Unhandled promise rejection';
            debugLog('Rejection message:', lastError);
        }

        // Skip showing generic rejection messages immediately
        if (lastError === 'Unhandled promise rejection' || lastError === 'Error' ||
            lastError === 'Failed to fetch') {
            debugLog('Generic rejection detected, not showing error screen immediately');
            return true;
        }

        // Include buffer context for potential Vite errors
        if (errorBuffer.length > 0 && (lastError.includes('vite') || lastError.includes('import'))) {
            const fullErrorMessage = errorBuffer.join('\n\n') + '\n\n' + lastError;
            lastError = fullErrorMessage;
            debugLog('Enhanced rejection with buffer contents:', lastError);
        }

        showErrorScreen(lastError);
        return true;
    });

    // Function to create and display the error screen
    function showErrorScreen(errorMessage) {
        debugLog('showErrorScreen called with:', errorMessage);

        // Check if error overlay already exists - update its content instead of creating new
        const existingOverlay = document.getElementById('test-coder-error-overlay');
        if (existingOverlay) {
            debugLog('Error overlay already exists, updating content');

            // Update the message
            const messageElement = existingOverlay.querySelector('div[data-error-message]');
            if (messageElement) {
                messageElement.textContent = errorMessage;

                // Scroll to top of error message for better visibility of new error
                const messageContainer = messageElement.parentElement;
                if (messageContainer && messageContainer.scrollTop !== undefined) {
                    messageContainer.scrollTop = 0;
                }

                debugLog('Updated error message in existing overlay');
            }

            // Update the stored lastError
            lastError = errorMessage;

            return;
        }

        // Create overlay container
        const overlay = document.createElement('div');
        overlay.id = 'test-coder-error-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '9999';
        overlay.style.color = 'white';
        overlay.style.fontFamily = 'Arial, sans-serif';
        overlay.style.padding = '20px';
        overlay.style.boxSizing = 'border-box';

        // Create error content
        const content = document.createElement('div');
        content.style.maxWidth = '600px';
        content.style.width = '100%';
        content.style.backgroundColor = 'rgba(30, 30, 30, 0.95)';
        content.style.borderRadius = '8px';
        content.style.padding = '20px';
        content.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        content.style.maxHeight = '80vh'; // Limit height to 80% of viewport
        content.style.display = 'flex';
        content.style.flexDirection = 'column';
        content.style.position = 'relative'; // For positioning the close button

        // Create close button (X)
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '&times;'; // × symbol
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.backgroundColor = 'transparent';
        closeButton.style.border = 'none';
        closeButton.style.color = '#aaa';
        closeButton.style.fontSize = '20px';
        closeButton.style.fontWeight = 'bold';
        closeButton.style.cursor = 'pointer';
        closeButton.style.width = '30px';
        closeButton.style.height = '30px';
        closeButton.style.display = 'flex';
        closeButton.style.alignItems = 'center';
        closeButton.style.justifyContent = 'center';
        closeButton.style.borderRadius = '50%';
        closeButton.style.padding = '0';
        closeButton.style.zIndex = '1';
        closeButton.setAttribute('aria-label', 'Закрыть');
        closeButton.title = 'Закрыть';
        closeButton.onmouseover = function() {
            this.style.color = 'white';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        };
        closeButton.onmouseout = function() {
            this.style.color = '#aaa';
            this.style.backgroundColor = 'transparent';
        };
        closeButton.onclick = function() {
            document.body.removeChild(overlay);
            debugLog('Error overlay closed via X button');
        };
        
        // Create error title
        const title = document.createElement('h2');
        title.textContent = 'Произошла ошибка';
        title.style.marginTop = '0';
        title.style.marginBottom = '15px';
        title.style.color = '#ff5555';
        title.style.flexShrink = '0'; // Don't shrink the title

        // Create scrollable container for error message
        const messageContainer = document.createElement('div');
        messageContainer.style.overflow = 'auto'; // Enable scrolling
        messageContainer.style.maxHeight = 'calc(80vh - 120px)'; // Allow container to scroll
        messageContainer.style.marginBottom = '15px';
        messageContainer.style.flexGrow = '1'; // Take available space

        // Create error message
        const message = document.createElement('div');
        message.setAttribute('data-error-message', ''); // Add data attribute for targeting
        message.style.padding = '10px';
        message.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        message.style.borderRadius = '4px';
        message.style.fontFamily = 'monospace';
        message.style.fontSize = '12px'; // Smaller font for more content
        message.style.lineHeight = '1.4';
        message.style.whiteSpace = 'pre-wrap';
        message.style.wordBreak = 'break-word';
        message.textContent = errorMessage;

        // Add message to scrollable container
        messageContainer.appendChild(message);

        // Create fix button with wrench icon
        const button = document.createElement('button');
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg> Нажмите, чтобы починить';
        button.style.backgroundColor = '#FBB040';
        button.style.color = 'black';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.padding = '8px 16px';
        button.style.cursor = 'pointer';
        button.style.fontWeight = 'bold';
        button.style.display = 'flex';
        button.style.justifyContent = 'center';
        button.style.alignItems = 'center';
        button.style.gap = '8px';
        button.onclick = function () {
            debugLog('Fix button clicked, sending error to parent');

            // Create the message payload
            const messagePayload = {
                type: "error",
                errorDescription: `Произошла ошибка, почини её:\n\n${errorMessage}`,
                // Include the full error buffer for context
                errorBuffer: errorBuffer.slice()
            };

            debugLog('Sending message payload:', messagePayload);

            // Send message to parent window with full error context
            try {
                window.parent.postMessage(messagePayload, "*");
                debugLog('Message sent successfully');
            } catch (e) {
                debugLog('Error sending message to parent:', e);
            }

            // Remove the error overlay
            try {
                document.body.removeChild(overlay);
                debugLog('Error overlay removed');
            } catch (e) {
                debugLog('Error removing overlay:', e);
            }
        };

        // Append elements to DOM in the correct hierarchy
        content.appendChild(closeButton); // Add the close button (X)
        content.appendChild(title);
        content.appendChild(messageContainer); // Add the scrollable container
        content.appendChild(button);
        overlay.appendChild(content);
        document.body.appendChild(overlay);
    }
})();
