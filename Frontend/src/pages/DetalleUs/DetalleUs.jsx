import "./DetalleUs.scss"
import Usuario from "../../assets/Usuario.png";

function DetalleUs() {
        let currentPage = 1;

        function viewOrderDetails(orderId) {
            alert(`Ver detalles de la orden: ${orderId}`);
        }

        function previousPage() {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
            }
        }

        function nextPage() {
            if (currentPage < 10) {
                currentPage++;
                updatePagination();
            }
        }

        function updatePagination() {
            const buttons = document.querySelectorAll('.pagination button[data-page]');
            buttons.forEach(btn => {
                btn.classList.remove('active');
                if (parseInt(btn.dataset.page) === currentPage) {
                    btn.classList.add('active');
                }
            });
        }

        
        document.querySelectorAll('.pagination button[data-page]').forEach(btn => {
            btn.addEventListener('click', () => {
                currentPage = parseInt(btn.dataset.page);
                updatePagination();
            });
        });

        
        window.addEventListener('load', () => {
            const elements = document.querySelectorAll('.user-details-card, .orders-section');
            elements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    el.style.transition = 'all 0.6s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            });
        });

    return (
        <>
        <div class="container">
        <h1>Detalles de usuario</h1>
        
        <div class="user-details-card">
            <div class="user-profile">
                <div class="user-info-section">
                    <h2 class="user-name">Juan Perez</h2>
                    <div class="user-detail">
                        <strong>Correo:</strong> <a href="mailto:juan.perez@gmail.com">juan.perez@gmail.com</a>
                    </div>
                    <div class="user-detail">
                        <strong>Fecha de registro:</strong> 20/01/2025
                    </div>
                    <div class="user-detail">
                        <strong>Estado:</strong> Activo
                    </div>
                </div>
                <div class="user-avatar-large">
                    <img src={Usuario} alt="Juan Perez"/>
                </div>
            </div>
        </div>

        <div class="orders-section">
            <div class="orders-header">
                <h3 class="orders-title">Últimas órdenes</h3>
            </div>
            
            <div class="orders-table">
                <div class="table-header">
                    <div>#ID</div>
                    <div>Fecha</div>
                    <div>Total</div>
                    <div>Acciones</div>
                </div>
                
                <div id="ordersContainer">
                    <div class="order-row">
                        <div class="order-id" onclick="viewOrderDetails('#1234')">#1234</div>
                        <div class="order-date">20/01/2025</div>
                        <div class="order-total">S/199.00</div>
                        <div><button class="view-details-btn" onclick="viewOrderDetails('#1234')">Ver detalles</button></div>
                    </div>
                    
                    <div class="order-row">
                        <div class="order-id" onclick="viewOrderDetails('#2356')">#2356</div>
                        <div class="order-date">20/02/2025</div>
                        <div class="order-total">S/199.00</div>
                        <div><button class="view-details-btn" onclick="viewOrderDetails('#2356')">Ver detalles</button></div>
                    </div>
                    
                    <div class="order-row">
                        <div class="order-id" onclick="viewOrderDetails('#4597')">#4597</div>
                        <div class="order-date">20/03/2025</div>
                        <div class="order-total">S/199.00</div>
                        <div><button class="view-details-btn" onclick="viewOrderDetails('#4597')">Ver detalles</button></div>
                    </div>
                    
                    <div class="order-row">
                        <div class="order-id" onclick="viewOrderDetails('#3743')">#3743</div>
                        <div class="order-date">20/03/2025</div>
                        <div class="order-total">S/199.00</div>
                        <div><button class="view-details-btn" onclick="viewOrderDetails('#3743')">Ver detalles</button></div>
                    </div>
                    
                    <div class="order-row">
                        <div class="order-id" onclick="viewOrderDetails('#3743')">#3743</div>
                        <div class="order-date">20/03/2025</div>
                        <div class="order-total">S/199.00</div>
                        <div><button class="view-details-btn" onclick="viewOrderDetails('#3743')">Ver detalles</button></div>
                    </div>
                    
                    <div class="order-row">
                        <div class="order-id" onclick="viewOrderDetails('#3743')">#3743</div>
                        <div class="order-date">20/03/2025</div>
                        <div class="order-total">S/199.00</div>
                        <div><button class="view-details-btn" onclick="viewOrderDetails('#3743')">Ver detalles</button></div>
                    </div>
                </div>
            </div>

            <div class="pagination">
                <button onclick="previousPage()">←</button>
                <button class="active" data-page="1">1</button>
                <button data-page="2">2</button>
                <button data-page="3">3</button>
                <span class="dots">...</span>
                <button data-page="10">10</button>
                <button onclick="nextPage()">→</button>
            </div>
            </div>
        </div>
        </>
    );
}

export default DetalleUs;